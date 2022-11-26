import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import barba from '@barba/core';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

gsap.registerPlugin(Flip, ScrollToPlugin);

export default function pageTransitions() {
    barba.init({
        transitions: [
            {
                name: 'home',
                sync: true,
                to: { namespace: ['home'] },
                leave(data) {
                    gsap.set(data.current.container, {
                        position: 'absolute'
                    });
                    return gsap.to(data.current.container, {
                        autoAlpha: 0,
                        duration: 0.4
                    });
                },
                enter(data) {
                    return gsap.from(data.next.container, {
                        autoAlpha: 0,
                        duration: 0.4
                    });
                }
            },
            {
                name: 'object',
                sync: true,
                to: { namespace: ['object'] },
                leave(data) {
                    gsap.set(data.current.container, {
                        position: 'absolute'
                    });

                    const trigger = data.trigger;

                    const sourceImageWrapper = trigger.querySelector('.portfolio__card-animation-wrapper');

                    const targetImageWrapper = data.next.container.querySelector('.object-intro__bg-animation-wrapper');

                    const sizeReference = document.querySelector('.portfolio__size-reference');

                    const state = Flip.getState(targetImageWrapper);

                    gsap.set(sourceImageWrapper, {
                        zIndex: 200
                    });

                    return Flip.to(state, {
                        targets: sourceImageWrapper,
                        duration: 1,
                        absolute: true,
                        ease: 'power2.out'
                    })
                        .to(
                            window,
                            {
                                duration: 1,
                                ease: 'power2.out',
                                scrollTo: {
                                    y: 0,
                                    autoKill: false
                                }
                            },
                            0
                        )
                        .to(data.current.container, {
                            autoAlpha: 0,
                            duration: 0.2,
                            delay: 0.5
                        });
                },
                enter(data) {
                    gsap.set(data.next.container, {
                        zIndex: 250,
                        position: 'relative'
                    });

                    const tl = gsap.timeline();
                    return tl.from(data.next.container, {
                        autoAlpha: 0,
                        duration: 0.5,
                        delay: 1
                    });
                }
            }
        ]
    });

    // barba.hooks.enter(data => {
    //     window.scrollTo({
    //         top: 0
    //         // behavior: 'smooth'
    //     });
    // });

    barba.hooks.afterEnter(data => {
        const event = new CustomEvent(PAGE_ENTER, {
            bubbles: true,
            detail: {
                container: data.next.container
            }
        });

        document.dispatchEvent(event);
    });
    barba.hooks.afterLeave(data => {
        const event = new CustomEvent(PAGE_LEAVE, {
            bubbles: true,
            detail: {
                container: data.current.container
            }
        });

        document.dispatchEvent(event);
    });
}
