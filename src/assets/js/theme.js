const setLightTheme = () => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.add('light-theme');
};

const setDarkTheme = () => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.remove('light-theme');
};

document.addEventListener('click', event => {
    if (event.target.matches('.js-theme') || event.target.closest('.js-theme')) {
        event.preventDefault();
        if (document.documentElement.classList.contains('light-theme')) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
});

if (localStorage.getItem('theme') === 'light') {
    setLightTheme();
}
