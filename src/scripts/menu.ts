const obj = document.querySelector('.hamburger')
const nav = document.querySelector('.nav-links')

obj &&
    nav &&
    obj.addEventListener('click', () => {
        nav.classList.toggle('expanded')
    })
