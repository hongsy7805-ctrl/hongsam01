const recommendBtn = document.getElementById('recommend');
const menusContainer = document.getElementById('menus');
const themeToggle = document.getElementById('theme-toggle');

// 다크/라이트 모드
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

// 메뉴 목록
const menuList = [
    { name: '삼겹살', icon: '🥓', tag: '한식' },
    { name: '된장찌개', icon: '🍲', tag: '한식' },
    { name: '김치찌개', icon: '🍲', tag: '한식' },
    { name: '순두부찌개', icon: '🍲', tag: '한식' },
    { name: '비빔밥', icon: '🥗', tag: '한식' },
    { name: '불고기', icon: '🥩', tag: '한식' },
    { name: '갈비탕', icon: '🍖', tag: '한식' },
    { name: '설렁탕', icon: '🍜', tag: '한식' },
    { name: '닭볶음탕', icon: '🍗', tag: '한식' },
    { name: '제육볶음', icon: '🥘', tag: '한식' },
    { name: '낙지볶음', icon: '🦑', tag: '한식' },
    { name: '해물파전', icon: '🥞', tag: '한식' },
    { name: '쌀국수', icon: '🍜', tag: '아시안' },
    { name: '팟타이', icon: '🍝', tag: '아시안' },
    { name: '초밥', icon: '🍣', tag: '일식' },
    { name: '라멘', icon: '🍜', tag: '일식' },
    { name: '돈카츠', icon: '🍱', tag: '일식' },
    { name: '우동', icon: '🍜', tag: '일식' },
    { name: '짜장면', icon: '🍝', tag: '중식' },
    { name: '짬뽕', icon: '🍜', tag: '중식' },
    { name: '마파두부', icon: '🍲', tag: '중식' },
    { name: '탕수육', icon: '🍗', tag: '중식' },
    { name: '피자', icon: '🍕', tag: '양식' },
    { name: '파스타', icon: '🍝', tag: '양식' },
    { name: '스테이크', icon: '🥩', tag: '양식' },
    { name: '리조또', icon: '🍚', tag: '양식' },
    { name: '버거', icon: '🍔', tag: '양식' },
    { name: '타코', icon: '🌮', tag: '멕시칸' },
    { name: '카레', icon: '🍛', tag: '기타' },
    { name: '볶음밥', icon: '🍳', tag: '기타' },
];

function pickRandomMenus(count) {
    const shuffled = [...menuList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function displayMenus(menus) {
    menusContainer.innerHTML = '';
    menus.forEach(menu => {
        const card = document.createElement('div');
        card.classList.add('menu-card');

        card.innerHTML = `
            <div class="menu-icon">${menu.icon}</div>
            <div class="menu-info">
                <div class="menu-name">${menu.name}</div>
                <span class="menu-tag">${menu.tag}</span>
            </div>
        `;
        menusContainer.appendChild(card);
    });
}

function recommend() {
    const menus = pickRandomMenus(5);
    displayMenus(menus);
}

recommendBtn.addEventListener('click', recommend);

// 초기 추천
recommend();
