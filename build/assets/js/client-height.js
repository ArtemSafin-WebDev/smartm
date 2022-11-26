let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
let previousWidth = document.documentElement.clientWidth;
window.addEventListener('resize', () => {
    const currentWidth = document.documentElement.clientWidth;
    if (previousWidth === currentWidth) return;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    previousWidth = currentWidth;
});
