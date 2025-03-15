document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileNav = document.getElementById('mobileNav');

    function openMenu() {
        mobileNav.classList.remove('hidden');
        setTimeout(() => {
            mobileNav.classList.add('show');
        }, 10);
        menuToggle.classList.add('hidden');
        closeMenu.classList.remove('hidden');
    }

    function closeNavMenu() {
        mobileNav.classList.remove('show');
        setTimeout(() => {
            mobileNav.classList.add('hidden');
        }, 300);
        menuToggle.classList.remove('hidden');
        closeMenu.classList.add('hidden');
    }

    menuToggle.addEventListener('click', openMenu);

    closeMenu.addEventListener('click', closeNavMenu);

    document.addEventListener('click', function (event) {
        if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
            closeNavMenu();
        }
    });
});

function closeNavMenu() {
    mobileNav.classList.remove('show');
    setTimeout(() => {
        mobileNav.classList.add('hidden');
    }, 300);
    menuToggle.classList.remove('hidden');
    closeMenu.classList.add('hidden');
}