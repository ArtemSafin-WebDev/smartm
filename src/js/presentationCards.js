import { PAGE_ENTER, PAGE_LEAVE } from './constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IS_MOBILE } from './utils';

gsap.registerPlugin(ScrollTrigger);

export default function presentationCards() {
    let instances = [];
    function initializePresentationCards(context = document) {
        if (IS_MOBILE) return;
        const cards = Array.from(context.querySelectorAll('.presentation__card'));

        cards.forEach(card => {
            const imageContainer = card.querySelector('.presentation__card-image-container');
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'center bottom',
                    end: 'bottom center',
                    scrub: true
                }
            });

            tl.to(imageContainer, {
                width: window.innerWidth,
                duration: 1
            });

            instances.push(tl);
        });
    }

    function destroyPresentationCards() {
        instances.forEach(instance => instance.kill());
        instances = [];
    }

    initializePresentationCards();

    document.addEventListener(PAGE_LEAVE, event => {
        destroyPresentationCards();
    });

    document.addEventListener(PAGE_ENTER, event => {
        initializePresentationCards(event.detail.container);
    });
}
