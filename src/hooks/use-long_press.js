export function long_press(el, fn) {
    let timer;
    el.addEventListener('touchstart', () => timer = setTimeout(fn, 500));
    el.addEventListener('touchend', () => clearTimeout(timer));
}