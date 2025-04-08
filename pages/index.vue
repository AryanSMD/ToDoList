<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'

const title = ref <string> ('');
const showErr = ref <boolean> (false);

const trimTitle = computed((): string => {
    return title.value.trim();
})

function addTask() {
    if (!trimTitle.value) {
        showErr.value = true;
    } else {
        showErr.value = false;
        store().addTask({
            title: trimTitle.value,
            isDone: false,
        });
        title.value = '';
    }
}

function moveUp(index: number) {
    !!index && switcher(index, index - 1);
}

function moveDown(index: number) {
    index !== store().getTasks.length - 1 &&
        switcher(index, index + 1);
}

function switcher(firstIndex: number, secondIndex: number) {
    const prevVal = store().getTasks[secondIndex];
    store().getTasks[secondIndex] = store().getTasks[firstIndex];
    store().getTasks[firstIndex] = prevVal;
}
</script>

<template>
    <div absolute w='~ full md:3/4 lg:45% [1700px]:2/5' h="55%" flex flex-col>
        <div flex items-center justify-between gap-2 mb-2 class="card">
            <input
                v-model="title"
                type="text"
                placeholder="Enter Task Title ..." 
                :class="showErr && 'err'"
                @keyup.enter="addTask()"
            >
            <button w-16 class="btn add" @click="addTask">Add</button>
        </div>
        <div h-full flex flex-col gap-2 class="card">
            <div class="title">List</div>
            <div 
                v-auto-animate
                w-full h-full border-1 border-solid border-slate-300 dark:border-slate-600
                rounded-md p-2 flex flex-col divide-y-1 divide-x-0 divide-solid divide-slate-300 
                dark:divide-slate-600 transition-all duration-300 overflow-x-hidden
            >
                <Task
                    v-for="task, index in store().getTasks"
                    :key="task.title"
                    :title="task.title"
                    :index="index"
                    @move-up="moveUp"
                    @move-down="moveDown"
                />
            </div>
            <div w-full flex justify-center items-center gap-5>
                <button class="btn add" @click="store().doneAll">Done All</button>
                <button class="btn clear" @click="store().removeAll">Clear All</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    @apply
    bg-white dark:bg-darkColor rounded-md shadow-lg p-4 transition-all duration-300 
    overflow-hidden
}
.card .title {
    @apply
    text-[1.5rem] lg:text-[1.8rem]
}
.btn {
    @apply
    h-10 sm:h-12 bg-transparent border-1 rounded-md transition-colors text-[.8rem] sm:text-[1rem]
    duration-300 flex justify-center items-center font-bold py-2 px-5 font-medium
}
.btn.add {
    @apply
    border-primary text-primary hover:bg-primary hover:text-white
}
.btn.clear {
    @apply
    border-red-500 text-red-500 hover:bg-red-500 hover:text-white
}
</style>