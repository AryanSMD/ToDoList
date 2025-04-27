<script setup lang="ts">
const props = defineProps<{
    btnValue: string,
    btnType: string,
    onClick: () => void
}>();
</script>

<template>
    <button 
        class="border-none outline-none cursor-pointer py-2 px-4 min-w-[100px] text-white 
            rounded-md font-medium text-[.8rem] md:text-[.9rem]" 
        :class="props.btnType"
        @click="props.onClick"
    >
        {{ props.btnValue }}
    </button>
</template>

<style scoped>
.save {
    background-color: var(--color-primary);
}
.save:hover {
    background-color: var(--color-secondary);
}
.cancel {
    background-color: var(--color-slate-500);
}
.cancel:hover {
    background-color: var(--color-slate-700);
}
.del {
    background-color: var(--color-red-500);
}
.del:hover {
    background-color: var(--color-red-700);
}
</style>