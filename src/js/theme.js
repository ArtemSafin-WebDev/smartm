export default function theme() {
    const themeBtn = document.querySelector('.js-theme');
    if (!themeBtn) return;

    const setLightTheme = () => {
        themeBtn.classList.add('active');
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.add('light-theme');
    };

    const setDarkTheme = () => {
        themeBtn.classList.remove('active');
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.remove('light-theme');
    };

    themeBtn.addEventListener('click', event => {
        event.preventDefault();
        if (themeBtn.classList.contains('active')) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    });

    if (localStorage.getItem('theme') === 'light') {
        setLightTheme();
    }
}
