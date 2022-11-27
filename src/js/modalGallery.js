import { Swiper, Navigation, EffectFade } from 'swiper';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

Swiper.use([Navigation, EffectFade]);

export default function modalGallery() {
    let instances = [];

    function initializeSliders(context = document) {
        const elements = Array.from(context.querySelectorAll('.js-modal-gallery'));

        elements.forEach(element => {
            const mainContainer = element.querySelector('.object-gallery__modal-slider-main .swiper');
            const thumbsContainer = element.querySelector('.object-gallery__modal-slider-thumbs .swiper');
            const thumbsCards = Array.from(element.querySelectorAll('.object-gallery__modal-slider-thumbs-card'));

            const thumbsInstance = new Swiper(thumbsContainer, {
                watchOverflow: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                slidesPerView: 'auto',
                threshold: 10,
                speed: 700,
                slideToClickedSlide: true,
                spaceBetween: 0,
                centerInsufficientSlides: true
            });

            const mainInstance = new Swiper(mainContainer, {
                watchOverflow: true,
                spaceBetween: 10,
                speed: 700,
                longSwipesRatio: 0.2,
                navigation: {
                    nextEl: element.querySelector('.object-gallery__modal-slider-arrow--next'),
                    prevEl: element.querySelector('.object-gallery__modal-slider-arrow--prev')
                },
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
                if (
                    event.target.matches('.object-gallery__modal-slider-thumbs-card') ||
                    event.target.closest('.object-gallery__modal-slider-thumbs-card')
                ) {
                    event.preventDefault();
                    const card = event.target.matches('.object-gallery__modal-slider-thumbs-card')
                        ? event.target
                        : event.target.closest('.object-gallery__modal-slider-thumbs-card');
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
