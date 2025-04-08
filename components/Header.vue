<template>
    <div w-full flex items-center justify-between absolute top-10 left-0 z-5>
        <div text-white text="~ 4rem md:5.5rem lg:7rem" italic font-bold>To Do</div>
        <button 
            relative w="~ 4rem md:5.5rem lg:7rem" aspect="1" rounded-full overflow-hidden 
            border-none flex justify-center items-center bg-transparent
            @click="store().setDarkMode()"
        >
            <IconsSun 
                bg-lightBg class="icon" 
                :class="store().getDarkMode && 'translate-x-[-150px] opacity-0'" 
            />
            <IconsMoon 
                bg-darkBg class="icon" 
                :class="!store().getDarkMode && 'translate-x-[150px] opacity-0'" 
            />
        </button>
    </div>
</template>

<style scoped>
.icon {
    @apply
    w-full h-full absolute transition-all duration-300
}
</style>