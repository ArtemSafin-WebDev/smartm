import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';

import modals from './modals';
import tabs from './tabs';
import menu from './menu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import fileUpload from './fileUpload';
import objectsSlider from './objectsSlider';
import stagesSlider from './stagesSlider';
import intro from './intro';
import pageTransitions from './pageTransitions';
import phoneMasks from './phoneMasks';
import validation from './validation';
import maps from './maps';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    detectTouch();
    setScrollbarWidth();
    phoneMasks();
    modals();
    tabs();
    menu();
    fileUpload();
    objectsSlider();
    stagesSlider();
    intro();
    pageTransitions();
    validation();
    maps();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
