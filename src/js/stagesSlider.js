import { Swiper, Navigation, EffectCreative } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectCreative]);

export default function stagesSlider() {
    const elements = Array.from(document.querySelectorAll('.js-stages-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            effect: 'creative',
            slidesPerView: 'auto',
            speed: 700,
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
    });
}
