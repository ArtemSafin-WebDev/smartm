import { Swiper, Navigation, EffectCreative } from 'swiper';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

Swiper.use([Navigation, EffectCreative]);

export default function objectsSlider() {
    let instances = [];

    function initializeSliders(context = document) {
        const elements = Array.from(context.querySelectorAll('.js-object-slider'));

        elements.forEach(element => {
            const container = element.querySelector('.swiper');

            const instance = new Swiper(container, {
                effect: 'creative',
                slidesPerView: 'auto',
                speed: 700,
                navigation: {
                    nextEl: element.querySelector('.slider-arrows__btn--next'),
                    prevEl: element.querySelector('.slider-arrows__btn--prev')
                },
                loop: true,
                loopedSlides: 8,
                loopAdditionalSlides: 8,
                creativeEffect: {
                    prev: {
                        translate: [0, 0, -400],
                        opacity: 0
                    },
                    next: {
                        translate: ['100%', 0, 0],
                        opacity: 1
                    },
                    limitProgress: 15
                }
            });

            instances.push(instance);
        });
    }

    function destroySliders() {
        instances.forEach(instance => instance.destroy());
        instances = [];
    }

    initializeSliders();

    document.addEventListener(PAGE_LEAVE, event => {
        destroySliders();
    });

    document.addEventListener(PAGE_ENTER, event => {
        initializeSliders(event.detail.container);
    });
}
