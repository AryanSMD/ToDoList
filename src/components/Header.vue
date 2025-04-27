<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks';
import IconMoon from './icons/IconMoon.vue';
import IconSun from './icons/IconSun.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const store = useTasksStore();
const route = useRoute();
const routesTitle = [
    {
        path: '',
        title: 'To Do'
    },
    {
        path: 'create',
        title: 'Create'
    },
    {
        path: 'edit',
        title: 'Edit'
    },
];

const pageTitle = computed(() =>
    routesTitle.find(e => e.path === route.path.split('/')[1].toString())?.title
)
</script>

<template>
    <div class="w-full flex items-center justify-between mb-5 lg:mb-10">
        <div class="py-2 mb-3">
            <div class="w-full relative rounded-md overflow-hidden p-[5px] shadow-md shadow-slate-500 z-[1]">
                <div class="animated-gradient"></div>
                <h1 
                    class="text-[3rem] lg:text-[3.5rem] 2xl:text-[4rem] font-bold text-text 
                        dark:text-darkText bg-white dark:bg-darkColor w-full h-full text-center 
                        rounded-md select-none py-1 px-10 transition-colors duration-300"
                >
                    {{ pageTitle }}
                </h1>
            </div>
        </div>
        <button 
            class="relative w-[4rem] md:w-[5.5rem] lg:w-[7rem] aspect-square rounded-full 
            overflow-hidden border-none flex justify-center items-center bg-transparent"
            @click="store.changeMode()"
        >
            <IconSun 
                class="icon text-white"
                :class="store.darkMode && 'translate-x-[-150px] opacity-0'" 
            />
            <IconMoon 
                class="icon text-darkColor" 
                :class="!store.darkMode && 'translate-x-[150px] opacity-0'" 
            />
        </button>
    </div>
</template>

<style scoped>
.animated-gradient {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: -1;
}
.animated-gradient::before {
    content: '';
    inset: -10px;
    background: conic-gradient(
        from var(--angle), red, orange, cyan, blue, purple, magenta
    );
    position: absolute;
    animation: animationCard 3s infinite linear;
}
@property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: true;
}
@keyframes animationCard {
    to {
        --angle: 360deg;
    }
}
.icon {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all .3s;
}
</style>