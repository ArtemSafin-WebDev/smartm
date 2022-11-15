import { Swiper, Navigation, EffectCreative } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectCreative]);

export default function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
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
    });
}
