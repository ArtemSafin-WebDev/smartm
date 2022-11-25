import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

export default function tabs() {
    let instances = [];

    function initializeTabs() {
        const elements = Array.from(document.querySelectorAll('.js-tabs'));

        elements.forEach(element => {
            const btns = Array.from(element.querySelectorAll('.js-tabs-btn'));
            const items = Array.from(element.querySelectorAll('.js-tabs-item'));

            const setActiveTab = index => {
                const state = Flip.getState(items[0].parentElement);
                btns.forEach(btn => btn.classList.remove('active'));
                items.forEach(item => item.classList.remove('active'));

                btns[index].classList.add('active');
                items[index].classList.add('active');

                Flip.from(state, {
                    ease: 'power1.inOut',
                    duration: 0.4,
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                });
            };

            if (items.length) {
                setActiveTab(0);
            }

            const clickHandler = event => {
                if (event.target.matches('.js-tabs-btn') || event.target.closest('.js-tabs-btn')) {
                    event.preventDefault();
                    const btn = event.target.matches('.js-tabs-btn') ? event.target : event.target.closest('.js-tabs-btn');

                    console.log('BTN', btn);

                    const btnIndex = btns.findIndex(item => item === btn);
                    setActiveTab(btnIndex);
                }
            };

            element.addEventListener('click', clickHandler);

            instances.push({
                element,
                handler: clickHandler
            });
        });
    }

    function destroyTabs() {
        instances.forEach(instance => {
            instance.element.removeEventListener('click', instance.handler);
        });
        instances = [];
    }

    initializeTabs();

    document.addEventListener('swup:willReplaceContent', event => {
        destroyTabs();
    });

    document.addEventListener('swup:contentReplaced', event => {
        initializeTabs();
    });
}
