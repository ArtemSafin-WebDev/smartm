import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(Flip, ScrollToPlugin);

export const standardFadeIn = data => {
    return gsap.from(data.next.container, {
        autoAlpha: 0,
        duration: 0.4
    });
};

export const standardFadeOut = data => {
    gsap.set(data.current.container, {
        position: 'absolute'
    });
    return gsap.to(data.current.container, {
        autoAlpha: 0,
        duration: 0.4
    });
};

export const objectIn = data => {
    gsap.set(data.next.container, {
        zIndex: 250,
        position: 'absolute'
    });

    const tl = gsap.timeline();

    return tl.from(data.next.container, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 2
        // onComplete: () => {
        //     gsap.set(data.next.container, {
        //         clearProps: 'all'
        //     });
        // }
    });
};

export const objectOut = data => {
    gsap.set(data.current.container, {
        position: 'absolute'
    });

    const trigger = data.trigger;
    const sourceImageWrapper = trigger.querySelector('.js-object-animation-wrapper');
    const sizeReference = document.querySelector('.size-reference');
    const state = Flip.getState(sourceImageWrapper);

    gsap.set(sizeReference, {
        autoAlpha: 1,
        zIndex: 200
    });
    sizeReference.innerHTML = '';
    sizeReference.appendChild(sourceImageWrapper);

    return Flip.from(state, {
        duration: 2,
        absolute: true,
        ease: 'power2.out'
    })
        .to(window, {
            duration: 0,
            ease: 'power2.out',
            scrollTo: {
                y: 0,
                autoKill: false
            }
        })
        .to(
            data.current.container,
            {
                autoAlpha: 0,
                duration: 1
            },
            0
        )
        .to(
            sizeReference,
            {
                autoAlpha: 0,
                duration: 0.2
            },
            2.5
        );
};
