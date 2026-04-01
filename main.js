const generateBtn = document.getElementById('generate');
const numbersContainer = document.querySelector('.numbers');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numbersContainer.innerHTML = '';
    for (const number of numbers) {
        const numberEl = document.createElement('div');
        numberEl.classList.add('number');
        numberEl.textContent = number;
        numbersContainer.appendChild(numberEl);
    }
}

function generateAndDisplayNumbers() {
    const numbers = generateNumbers();
    displayNumbers(numbers);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// Initial generation
generateAndDisplayNumbers();
