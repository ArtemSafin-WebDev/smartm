import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import barba from '@barba/core';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

gsap.registerPlugin(Flip);

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
            }
        ]
    });

    // barba.hooks.before(data => {
    //     const currentHeader = document.querySelector('.page-header');
    //     currentHeader.classList.remove('page-header--always-dark');
    //     currentHeader.classList.remove('page-header--always-light');

    //     const parser = new DOMParser();
    //     const nextPageHtml = parser.parseFromString(data.next.html, 'text/html');

    //     const nextHeader = nextPageHtml.querySelector('.page-header');

    //     console.log('Next header', nextHeader);

    //     if (nextHeader) {
    //         if (nextHeader.classList.contains('page-header--always-dark')) currentHeader.classList.add('page-header--always-dark');
    //         if (nextHeader.classList.contains('page-header--always-light')) currentHeader.classList.add('page-header--always-light');
    //     }
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
