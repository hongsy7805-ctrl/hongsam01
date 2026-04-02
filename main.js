const generateBtn = document.getElementById('generate');
const numbersContainer = document.querySelector('.numbers');
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(setsOfNumbers) {
    numbersContainer.innerHTML = '';
    setsOfNumbers.forEach((numbers, i) => {
        const row = document.createElement('div');
        row.classList.add('number-row');

        const label = document.createElement('span');
        label.classList.add('row-label');
        label.textContent = `${i + 1}`;
        row.appendChild(label);

        for (const number of numbers) {
            const numberEl = document.createElement('div');
            numberEl.classList.add('number');
            numberEl.textContent = number;
            row.appendChild(numberEl);
        }
        numbersContainer.appendChild(row);
    });
}

function generateAndDisplayNumbers() {
    const sets = Array.from({ length: 5 }, generateNumbers);
    displayNumbers(sets);
}

generateBtn.addEventListener('click', generateAndDisplayNumbers);

// Initial generation
generateAndDisplayNumbers();
