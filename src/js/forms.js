import { PAGE_ENTER, PAGE_LEAVE } from './constants';

export default function forms() {
    let instances = [];
    function initializeForms(context = document) {
        const elements = Array.from(context.querySelectorAll('.js-callback-form'));

        elements.forEach(element => {
            const form = element;
            const success = document.querySelector('.js-callback-success');

            const submitHandler = event => {
                event.preventDefault();
                if (
                    $(form)
                        .parsley()
                        .isValid()
                ) {
                    const formData = new FormData(form);

                    const url = form.action;
                    fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Ответ сети был не ok.');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);

                            if (data.status !== 'mail_sent') {
                                throw new Error('Mail not sent');
                            }

                            form.reset();
                            $(form)
                                .parsley()
                                .reset();
                            success.classList.add('active');

                            setTimeout(() => {
                                success.classList.remove('active');
                            }, 4000);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            };
            form.addEventListener('submit', submitHandler);
            instances.push({
                form,
                submitHandler
            });
        });
    }

    function destroyForms() {
        instances.forEach(({ form, submitHandler }) => {
            form.removeEventListener('click', submitHandler);
        });
        instances = [];
    }

    initializeForms();

    document.addEventListener(PAGE_LEAVE, event => {
        destroyForms();
    });

    document.addEventListener(PAGE_ENTER, event => {
        initializeForms(event.detail.container);
    });
}
