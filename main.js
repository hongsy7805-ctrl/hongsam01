const recommendBtn = document.getElementById('recommend');
const menusContainer = document.getElementById('menus');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');

// ── 다크/라이트 모드 ──────────────────────────────
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ── 다국어 ────────────────────────────────────────
const i18n = {
    ko: {
        title:    '오늘 저녁 뭐 먹지?',
        subtitle: '고민하지 말고 운에 맡겨봐요!',
        btn:      '메뉴 추천받기',
        langBtn:  'EN',
        htmlLang: 'ko',
    },
    en: {
        title:    "What's for Dinner?",
        subtitle: "Stop overthinking — let fate decide!",
        btn:      'Recommend Menus',
        langBtn:  'KO',
        htmlLang: 'en',
    },
};

let currentLang = localStorage.getItem('lang') || 'ko';

function applyLang(lang) {
    const t = i18n[lang];
    document.documentElement.lang = t.htmlLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t[el.dataset.i18n];
    });
    langToggle.textContent = t.langBtn;
    currentLang = lang;
    localStorage.setItem('lang', lang);
}

langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'ko' ? 'en' : 'ko');
    recommend();
});

// ── 메뉴 목록 (한/영 병기) ────────────────────────
const menuList = [
    { ko: '삼겹살',   en: 'Samgyeopsal',        icon: '🥓', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '된장찌개', en: 'Doenjang Jjigae',     icon: '🍲', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '김치찌개', en: 'Kimchi Jjigae',       icon: '🍲', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '순두부찌개',en: 'Sundubu Jjigae',     icon: '🍲', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '비빔밥',   en: 'Bibimbap',            icon: '🥗', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '불고기',   en: 'Bulgogi',             icon: '🥩', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '갈비탕',   en: 'Galbitang',           icon: '🍖', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '설렁탕',   en: 'Seolleongtang',       icon: '🍜', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '닭볶음탕', en: 'Dakbokkeumtang',      icon: '🍗', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '제육볶음', en: 'Jeyuk Bokkeum',       icon: '🥘', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '낙지볶음', en: 'Spicy Stir-fried Octopus', icon: '🦑', tagKo: '한식', tagEn: 'Korean' },
    { ko: '해물파전', en: 'Haemul Pajeon',       icon: '🥞', tagKo: '한식',   tagEn: 'Korean' },
    { ko: '쌀국수',   en: 'Pho',                 icon: '🍜', tagKo: '아시안', tagEn: 'Asian' },
    { ko: '팟타이',   en: 'Pad Thai',            icon: '🍝', tagKo: '아시안', tagEn: 'Asian' },
    { ko: '초밥',     en: 'Sushi',               icon: '🍣', tagKo: '일식',   tagEn: 'Japanese' },
    { ko: '라멘',     en: 'Ramen',               icon: '🍜', tagKo: '일식',   tagEn: 'Japanese' },
    { ko: '돈카츠',   en: 'Tonkatsu',            icon: '🍱', tagKo: '일식',   tagEn: 'Japanese' },
    { ko: '우동',     en: 'Udon',                icon: '🍜', tagKo: '일식',   tagEn: 'Japanese' },
    { ko: '짜장면',   en: 'Jajangmyeon',         icon: '🍝', tagKo: '중식',   tagEn: 'Chinese' },
    { ko: '짬뽕',     en: 'Jjamppong',           icon: '🍜', tagKo: '중식',   tagEn: 'Chinese' },
    { ko: '마파두부', en: 'Mapo Tofu',           icon: '🍲', tagKo: '중식',   tagEn: 'Chinese' },
    { ko: '탕수육',   en: 'Sweet & Sour Pork',   icon: '🍗', tagKo: '중식',   tagEn: 'Chinese' },
    { ko: '피자',     en: 'Pizza',               icon: '🍕', tagKo: '양식',   tagEn: 'Western' },
    { ko: '파스타',   en: 'Pasta',               icon: '🍝', tagKo: '양식',   tagEn: 'Western' },
    { ko: '스테이크', en: 'Steak',               icon: '🥩', tagKo: '양식',   tagEn: 'Western' },
    { ko: '리조또',   en: 'Risotto',             icon: '🍚', tagKo: '양식',   tagEn: 'Western' },
    { ko: '버거',     en: 'Burger',              icon: '🍔', tagKo: '양식',   tagEn: 'Western' },
    { ko: '타코',     en: 'Tacos',               icon: '🌮', tagKo: '멕시칸', tagEn: 'Mexican' },
    { ko: '카레',     en: 'Curry',               icon: '🍛', tagKo: '기타',   tagEn: 'Other' },
    { ko: '볶음밥',   en: 'Fried Rice',          icon: '🍳', tagKo: '기타',   tagEn: 'Other' },
];

function pickRandomMenus(count) {
    return [...menuList].sort(() => Math.random() - 0.5).slice(0, count);
}

function displayMenus(menus) {
    menusContainer.innerHTML = '';
    menus.forEach(menu => {
        const card = document.createElement('div');
        card.classList.add('menu-card');
        const name = currentLang === 'ko' ? menu.ko : menu.en;
        const tag  = currentLang === 'ko' ? menu.tagKo : menu.tagEn;
        card.innerHTML = `
            <div class="menu-icon">${menu.icon}</div>
            <div class="menu-info">
                <div class="menu-name">${name}</div>
                <span class="menu-tag">${tag}</span>
            </div>
        `;
        menusContainer.appendChild(card);
    });
}

function recommend() {
    displayMenus(pickRandomMenus(5));
}

recommendBtn.addEventListener('click', recommend);

// 초기 적용
applyLang(currentLang);
recommend();
