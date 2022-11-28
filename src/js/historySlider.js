import { Swiper, Navigation, EffectFade } from 'swiper';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectFade]);

export default function historySlider() {
    let instances = [];

    function initializeSliders(context = document) {
        const elements = Array.from(context.querySelectorAll('.js-history-slider'));

        elements.forEach(element => {
            const mainContainer = element.querySelector('.about-history__bottom-slider .swiper');
            const thumbsContainer = element.querySelector('.about-history__top-slider .swiper');
            const thumbsCards = Array.from(element.querySelectorAll('.about-history__dates-card'));

            const thumbsInstance = new Swiper(thumbsContainer, {
                watchOverflow: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                slidesPerView: 'auto',
                threshold: 10,
                speed: 700,
                slideToClickedSlide: true,
                spaceBetween: 0
            });

            const mainInstance = new Swiper(mainContainer, {
                watchOverflow: true,
                threshold: 10,
                speed: 700,
                slidesPerView: 'auto',
                longSwipesRatio: 0.1,
                autoHeight: IS_MOBILE ? true : false,
                on: {
                    slideChange: swiper => {
                        thumbsInstance.slideTo(swiper.activeIndex);
                        thumbsCards.forEach(card => card.classList.remove('thumb-active'));
                        thumbsCards[swiper.activeIndex]?.classList.add('thumb-active');
                    },
                    init: swiper => {
                        thumbsInstance.slideTo(swiper.activeIndex);
                        thumbsCards.forEach(card => card.classList.remove('thumb-active'));
                        thumbsCards[swiper.activeIndex]?.classList.add('thumb-active');
                    }
                },
                init: false
            });

            mainInstance.init();

            const thumbsClickHandler = event => {
                if (event.target.matches('.about-history__dates-card') || event.target.closest('.about-history__dates-card')) {
                    event.preventDefault();
                    const card = event.target.matches('.about-history__dates-card')
                        ? event.target
                        : event.target.closest('.about-history__dates-card');
                    const cardIndex = thumbsCards.findIndex(otherCard => otherCard === card);

                    mainInstance.slideTo(cardIndex);
                }
            };

            element.addEventListener('click', thumbsClickHandler);

            instances.push({
                thumbsInstance,
                mainInstance,
                element,
                thumbsClickHandler
            });
        });
    }

    function destroySliders() {
        instances.forEach(({ thumbsInstance, mainInstance, element, thumbsClickHandler }) => {
            thumbsInstance.destroy();
            mainInstance.destroy();
            element.removeEventListener('click', thumbsClickHandler);
        });
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
