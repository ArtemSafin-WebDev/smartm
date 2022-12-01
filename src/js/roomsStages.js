import { PAGE_ENTER, PAGE_LEAVE } from './constants';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Flip, ScrollToPlugin, Observer, ScrollTrigger);

export default function roomsStages() {
    let instances = [];

    function initializeSliders(context = document) {
        const TOUCH_MODE = false;
        const roomsPinWrapper = context.querySelector('.rooms__pin-wrapper');

        const elements = Array.from(context.querySelectorAll('.js-room-stages'));

        elements.forEach(element => {
            let activeIndex = 0;
            const titleLayers = Array.from(element.querySelectorAll('.rooms-stage__slide-title-layer'));
            const imageLayers = Array.from(element.querySelectorAll('.rooms-stage__slide-image-layer'));
            const textLayers = Array.from(element.querySelectorAll('.rooms-stage__slide-text-layer'));
            const counter = element.querySelector('.rooms-stage__counter-amount');
            const counterWrapper = element.querySelector('.rooms-stage__counter');
            const titleLayersWrapper = element.querySelector('.rooms-stage__slide-title-layers-wrapper');
            const textLayersWrapper = element.querySelector('.rooms-stage__slide-text-layers-wrapper');
            let animating = false;

            const setActiveIndex = (index, initial = false) => {
                if (index === -1) {
                    return;
                }
                let state = Flip.getState('.rooms-stage__slide-title-layers, .rooms-stage__slide-text-layers-wrapper');
                const computedTitleWrapperHeight = titleLayersWrapper?.offsetHeight;
                const computedTextWrapperHeight = textLayersWrapper?.offsetHeight;

                // if (!initial) {
                //     animating = true;
                // }

                titleLayers.forEach(layer => layer.classList.remove('active'));
                titleLayers[index]?.classList.add('active');
                textLayers.forEach(layer => layer.classList.remove('active'));
                textLayers[index]?.classList.add('active');
                imageLayers.forEach(layer => layer.classList.remove('active'));
                imageLayers[index]?.classList.add('active');

                activeIndex = index;

                counter.textContent = (activeIndex + 1).toString().padStart(2, '0');

                if (!initial) {
                    // Flip.from(state, {
                    //     duration: 0.4,
                    //     ease: 'power2.out',
                    //     onComplete: () => {
                    //         animating = false;
                    //     }
                    // });

                    const tl = gsap.timeline();
                    tl.fromTo(
                        titleLayersWrapper,
                        {
                            height: computedTitleWrapperHeight
                        },
                        {
                            height: 'auto',
                            duration: 0.6,
                            ease: 'power2.out'
                        }
                    ).fromTo(
                        textLayersWrapper,
                        {
                            height: computedTextWrapperHeight
                        },
                        {
                            height: 'auto',
                            duration: 0.6,
                            ease: 'power2.out'
                        },
                        0
                    );
                }
            };

            setActiveIndex(activeIndex, true);

            const slidePrev = () => {
                if (animating) return;
                if (activeIndex > 0) {
                    console.log('Sliding prev', activeIndex - 1);
                    setActiveIndex(activeIndex - 1);
                } else {
                    console.log('Minimum reached');
                }
            };

            const slideNext = () => {
                if (animating) return;
                console.log('Sliding next');
                if (activeIndex < titleLayers.length - 1) {
                    console.log('Sliding next', activeIndex + 1);
                    setActiveIndex(activeIndex + 1);
                } else {
                    console.log('Maximum reached');
                }
            };

            let trigger = null;

            if (TOUCH_MODE) {
                Observer.create({
                    target: element,
                    dragMinimum: 1,
                    type: 'touch,pointer',
                    onRelease: self => {
                        console.log('Delta x', self.deltaX);

                        if (self.deltaX > 0) {
                            slidePrev();
                        } else if (self.deltaX < 0) {
                            slideNext();
                        }
                    }
                });
            } else {
                console.log('Initialized Scroll Trigger');
                trigger = ScrollTrigger.create({
                    trigger: roomsPinWrapper,
                    start: 'top top',
                    markers: false,
                    end: () => `100%`,
                    anticipatePin: 1,
                    pin: true,
                    pinSpacing: true,
                    onUpdate: ({ progress, direction }) => {
                        const activeSlide = Math.ceil(textLayers.length * progress);

                        setActiveIndex(activeSlide - 1);

                        console.log('progress:', progress.toFixed(3), 'direction:', direction);

                        counterWrapper.style.setProperty('--slider-progress', progress.toFixed(3));

                        console.log('Active slide', activeSlide);
                    }
                });
            }

            instances.push({
                trigger
            });
        });
    }

    function destroySliders() {
        instances.forEach(instance => instance.kill());
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
