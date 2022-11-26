import Inputmask from 'inputmask';
import { PAGE_ENTER, PAGE_LEAVE } from './constants';

export default function phoneMasks() {
    let instances = [];

    function initializePhoneMasks(context = document) {
        const inputs = Array.from(context.querySelectorAll('.js-phone-input'));
        inputs.forEach(input => {
            const instance = new Inputmask({ mask: '+7 (999) 999-99-99' });
            instance.mask(input);

            instances.push({
                input
            });
        });
    }

    function destroyPhoneMasks() {
        instances.forEach(({ input }) => {
            if (input.inputmask) input.inputmask.remove();
        });

        instances = [];
    }

    initializePhoneMasks();

    document.addEventListener(PAGE_LEAVE, event => {
        destroyPhoneMasks();
    });

    document.addEventListener(PAGE_ENTER, event => {
        initializePhoneMasks(event.detail.container);
    });
}
