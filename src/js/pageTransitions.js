import barba from '@barba/core';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';
import { objectIn, objectOut, standardFadeIn, standardFadeOut } from './transitions';

export default function pageTransitions() {
    if (document.body.classList.contains('admin-bar')) return;
    barba.init({
        transitions: [
            {
                name: 'home',
                sync: true,
                to: { namespace: ['home'] },
                leave(data) {
                    return standardFadeOut(data);
                },
                enter(data) {
                    return standardFadeIn(data);
                }
            },
            {
                name: 'object',
                sync: true,
                to: { namespace: ['object'] },
                leave(data) {
                    return objectOut(data);
                },
                enter(data) {
                    return objectIn(data);
                }
            }
        ]
    });

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
