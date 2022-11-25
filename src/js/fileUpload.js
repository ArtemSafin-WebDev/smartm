export default function fileUpload() {
    let instances = [];

    function initializeFileUploads() {
        const elements = Array.from(document.querySelectorAll('.js-file-upload'));

        elements.forEach(element => {
            const input = element.querySelector('input[type="file"]');
            const label = element.querySelector('.js-file-upload-text');
            const form = element.closest('form');

            const originalLabelText = label.textContent;

            const changeHandler = () => {
                if (input.files.length) {
                    label.textContent = input.files[0].name;
                }
            };

            const dragEnterHandler = () => {
                element.classList.add('dragged');
            };

            const dragEndHandler = () => {
                element.classList.remove('dragged');
            };

            const dragLeaveHandler = () => {
                element.classList.remove('dragged');
            };

            const dropHandler = () => {
                element.classList.remove('dragged');
            };

            input.addEventListener('change', changeHandler);
            input.addEventListener('dragenter', dragEnterHandler);
            input.addEventListener('dragend', dragEndHandler);
            input.addEventListener('dragleave', dragLeaveHandler);
            input.addEventListener('drop', dropHandler);

            const formResetHandler = () => {
                input.value = '';
                label.innerHTML = originalLabelText;
                element.classList.remove('file-loaded');
                element.classList.remove('dragged');
            };

            if (form) {
                form.addEventListener('reset', formResetHandler);
            }

            const instance = {
                input,
                changeHandler,
                dragEnterHandler,
                dragEndHandler,
                dragLeaveHandler,
                dropHandler,
                form: form ? form : null,
                formResetHandler
            };

            instances.push(instance);
        });
    }

    function destroyFileUploads() {
        instances.forEach(instance => {
            const { input, changeHandler, dragEnterHandler, dragEndHandler, dragLeaveHandler, dropHandler, form, formResetHandler } = instance;

            input.removeEventListener('change', changeHandler);
            input.removeEventListener('dragenter', dragEnterHandler);
            input.removeEventListener('dragend', dragEndHandler);
            input.removeEventListener('dragleave', dragLeaveHandler);
            input.removeEventListener('drop', dropHandler);

            if (form) {
                form.removeEventListener('reset', formResetHandler);
            }
        });

        instances = [];
    }

    initializeFileUploads();

    document.addEventListener('swup:willReplaceContent', event => {
        destroyFileUploads();
    });

    document.addEventListener('swup:contentReplaced', event => {
        initializeFileUploads();
    });
}
