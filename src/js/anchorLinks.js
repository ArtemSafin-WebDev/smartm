import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

gsap.registerPlugin(ScrollToPlugin);

export default function anchorLinks() {
    const offset = 0;
    const DURATION = 1.4;
    const scrollByHash = (hash, context = document) => {
        if (!hash) return;
        const elementToScroll = context.querySelector(hash);
        if (elementToScroll && !elementToScroll.matches('.js-modal')) {
            if (window.menuOpen && typeof window.closeMenu === 'function') {
                window.closeMenu();
            } else if (window.activeModal && typeof window.closeModal === 'function') {
                window.closeModal(window.activeModal);
            }

            gsap.to(window, {
                duration: DURATION,
                ease: 'power2.out',
                scrollTo: {
                    y: elementToScroll,
                    autoKill: false,
                    offsetY: offset
                }
            });
        } else {
            console.error('No element to scroll');
        }
    };
    document.addEventListener('click', event => {
        if (event.target.matches('a') || event.target.closest('a')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;

            // console.log('Hash', hash);

            const url = new URL(link.href);
            const pageUrl = new URL(window.location);

            if (pageUrl.pathname !== url.pathname) return;

            if (hash) {
                event.preventDefault();
                scrollByHash(hash);
            }
        }
    });

    if (window.location.hash) {
        scrollByHash(window.location.hash);
    }

    document.addEventListener(PAGE_ENTER, event => {
        const container = event.detail.container;

        const hash = window.location.hash;

        console.log('Has hash', hash);

        scrollByHash(hash, container);
    });
}
