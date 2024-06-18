import { customRef } from "vue";

export function debounceRef(value, delay = 1000) {
    return customRef((track, trigger) => {
        let timer;
        return {
            get() {
                track()
                return value
            },
            set(val) {
                // console.log(val);
                clearTimeout(timer)
                timer = setTimeout(() => {
                    value = val;
                    trigger();
                }, delay);
            }
        }
    })
}