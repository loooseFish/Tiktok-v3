import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
    state: () => {
        return {
            loginShow: false,
            loaderShow: false,
            footerShow: true,
        }
    },
    getters: {

    },
    actions: {

    },
})
