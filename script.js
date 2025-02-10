function updateTime() {
    document.getElementById('currentTime').innerText = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
    document.querySelector('.hamburger-menu').classList.toggle('open');
}

AOS.init();
