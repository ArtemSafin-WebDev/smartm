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
import modalGallery from './modalGallery';
import gallery from './gallery';
import presentationCards from './presentationCards';
import historySlider from './historySlider';
import anchorLinks from './anchorLinks';
import forms from './forms';
import roomsStages from './roomsStages';
import cookies from './cookies';

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
    modalGallery();
    modals();
    gallery();
    presentationCards();
    historySlider();
    anchorLinks();
    forms();
    roomsStages();
    cookies();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
