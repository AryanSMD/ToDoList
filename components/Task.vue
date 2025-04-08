<script setup lang="ts">
const props = defineProps<{
    title: string,
    index: number
}>();
const emit = defineEmits(['moveUp', 'moveDown']);
</script>

<template>
    <div w-full p-2 flex items-center justify-between gap-5>
        <div 
            cursor-pointer w-full transition-transform duration-300 truncate
            :class="store().getTasks[index].isDone ? 'line-through translate-x-0' : 'translate-x-[-35px]'"
        >
            <input
                :id="props.index.toString()" 
                type="checkbox"
                :checked="store().getTasks[props.index].isDone" 
                @click="store().done(props.index);"
            >
            <label :for="props.index.toString()">{{ props.title }}</label>
        </div>
        <div flex items-center gap-1 lg:gap-2>
            <IconsArrowUp class="icon move" @click="emit('moveUp', props.index)" />
            <IconsArrowDown class="icon move" @click="emit('moveDown', props.index)" />
            <IconsTrash class="icon remove" @click="store().removeTask(props.index)" />
        </div>
    </div>
</template>

<style scoped>
.icon {
    @apply
    w-5 md:w-6 h-5 md:h-6 cursor-pointer bg-slate-300 dark:bg-slate-600 transition-all duration-300
}
.icon.move {
    @apply
    hover:bg-lightText dark:hover:bg-darkText
}
.icon.edit {
    @apply
    hover:bg-primary
}
.icon.remove {
    @apply
    hover:bg-red-500
}
</style>