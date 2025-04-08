<template>
    <div :class="store().darkMode && 'dark'">
        <div 
            w-screen h-screen overflow-hidden text-lightText dark:text-darkText
            bg-lightBg dark:bg-darkBg transition-colors duration-300
        >
            <BgLayer />
            <div h-full container w="~ 90% lg:80%" relative z-10 flex justify-center items-center>
                <Header />
                <slot />
            </div>
            <Footer />
        </div>        
    </div>
</template>