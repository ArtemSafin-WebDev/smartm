import { Swiper, Navigation, EffectCreative } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectCreative]);

export default function intro() {
    let instances = [];

    function initializeSliders() {
        const elements = Array.from(document.querySelectorAll('.js-intro'));
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
                longSwipesRatio: 0.25,
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

    document.addEventListener('swup:willReplaceContent', event => {
        destroySliders();
    });

    document.addEventListener('swup:contentReplaced', event => {
        initializeSliders();
    });
}
