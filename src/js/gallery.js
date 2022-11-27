import { Swiper, Navigation, EffectFade, FreeMode } from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { convertRemToPixels, IS_MOBILE } from './utils';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

Swiper.use([Navigation, EffectFade, FreeMode]);
gsap.registerPlugin(ScrollTrigger);

export default function gallery() {
    let instances = [];
    function initializeSliders(context = document) {
        const elements = Array.from(context.querySelectorAll('.js-gallery-slider'));

        elements.forEach(element => {
            const container = element.querySelector('.swiper');
            const instance = new Swiper(container, {
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                loopedSlides: 15,
                watchOverflow: true,
                speed: 700,
                freeMode: {
                    enabled: false,
                    sticky: true
                }
            });

            let tl = null;

            if (!IS_MOBILE) {
                tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                tl.fromTo(
                    element,
                    {
                        x: () => (window.matchMedia('(max-width: 640px)').matches ? -1 * convertRemToPixels(12) : -1 * convertRemToPixels(24))
                    },
                    {
                        x: () => (window.matchMedia('(max-width: 640px)').matches ? 1 * convertRemToPixels(12) : 1 * convertRemToPixels(24)),
                        duration: 0.5
                    }
                );
            }

            instances.push({
                slider: instance,
                timeline: tl
            });
        });
    }

    function destroySliders() {
        instances.forEach(({ slider, timeline }) => {
            slider.destroy();
            timeline?.kill();
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
