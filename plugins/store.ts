import { useDefaults } from "~/stores/defaults";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            useDefaults
        }
    }
})