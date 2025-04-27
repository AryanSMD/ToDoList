<script setup lang="ts">
const props = defineProps<{
    btnValue: boolean,
    onClick: () => void
}>();
</script>

<template>
    <div 
        class="w-auto h-10 rounded-full overflow-hidden flex items-center justify-start gap-2 
            md:mt-[5px] select-none"
    >
        <div 
            class="w-[50px] h-[18px] bg-grey rounded-full overflow-visible flex items-center 
                justify-center cursor-pointer"
            :class="!props.btnValue ? 'bg-slate-300' : 'bg-blue-300'" 
            @click="onClick"
        >
            <div 
                class="h-[30px] aspect-square rounded-full transition-transform duration-300 shadow-sm 
                    shadow-text" 
                :class="!props.btnValue ? 'translate-x-[-10px] bg-slate-300' : 'translate-x-[10px] bg-primary'"
            ></div>
        </div>
        <div class="flex items-center justify-center">
            <div class="text text-text dark:text-darkText" :class="!props.btnValue && 'hidden'">
                Completed
            </div>
            <div class="text text-text dark:text-darkText" :class="props.btnValue && 'hidden'">
                Not Completed
            </div>
        </div>
    </div>
</template>

<style scoped>
.text {
    font-weight: var(--font-weight-medium);
    cursor: default;
}
</style>