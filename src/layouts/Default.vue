<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import BGImage from '@/components/BGImage.vue';
</script>

<template>
    <BGImage />
    <div class="container !w-[95%] md:!w-[80%] m-auto">
        <Header />
        <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
    </div>
    <Footer />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>