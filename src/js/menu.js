import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

export default function menu() {
    let instances = [];
    function initializeMenu(context = document) {
        const burger = context.querySelector('.page-header__burger');
        const menu = context.querySelector('.page-header__menu');
        const nav = context.querySelector('.page-header__nav');

        let menuOpen = false;

        if (!burger || !menu) return;

        const openMenu = () => {
            if (menuOpen) return;
            document.body.classList.add('mobile-menu-open');
            disableBodyScroll(menu, {
                reserveScrollBarGap: true
            });
            menuOpen = true;
        };
        const closeMenu = () => {
            if (!menuOpen) return;
            document.body.classList.remove('mobile-menu-open');
            clearAllBodyScrollLocks();
            menuOpen = false;
        };

        const burgerClickHandler = event => {
            console.log('Burger clicked');
            event.preventDefault();
            if (!menuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        };

        const navClickHandler = event => {
            closeMenu();
        };

        burger.addEventListener('click', burgerClickHandler);
        nav?.addEventListener('click', navClickHandler);

        instances.push({
            nav,
            burger,
            navClickHandler,
            burgerClickHandler
        });
    }

    function destroyMenu() {
        clearAllBodyScrollLocks();

        instances.forEach((nav, burger, burgerClickHandler, navClickHandler) => {
            burger.removeEventListener('click', burgerClickHandler);
            nav?.removeEventListener('click', navClickHandler);
        });

        instances = [];
    }

    initializeMenu();

    document.addEventListener(PAGE_LEAVE, event => {
        destroyMenu();
    });

    document.addEventListener(PAGE_ENTER, event => {
        initializeMenu(event.detail.container);
    });
}
