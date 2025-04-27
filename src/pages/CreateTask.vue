<script setup lang="ts">
import BtnPrimary from '@/components/btns/BtnPrimary.vue';
import BtnSwitch from '@/components/btns/BtnSwitch.vue';
import { useRoute, useRouter } from 'vue-router';
import { useTasksStore } from '@/stores/tasks';
import { computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useTasksStore();
const newTask = ref<Task>({
    id: 0,
    description: '',
    createdAt: '',
    isCompleted: false
});

const isEdit = computed(() => !!route.params.id);

onMounted(() => {
    if (isEdit.value) {
        const id = parseInt(route.params.id as string);
        newTask.value = { ...store.getTaskById(id) } as Task;
    }
})

function save() {
    if (isEdit.value) {
        store.updateTask(newTask.value, newTask.value.id);
    } else {
        store.createTask(newTask.value);
    }
    
    Swal.fire({
        title: isEdit.value ? "Task Edited" : "Task Created",
        icon: "success",
        background: store.darkMode ? 'var(--color-darkColor)' : 'white',
        color: store.darkMode ? 'var(--color-darkText)' : 'var(--color-text)',
    })
    router.push('/');
}
</script>

<template>
    <div class="card">
        <div class="title">Form</div>
        <form @submit.prevent="save">
            <div class="w-full">
                <div>
                    <label>Description</label>
                    <textarea 
                        v-model="newTask.description"
                        placeholder="task description..."
                        required
                    />
                </div>
                <div>
                    <label>Status</label>
                    <BtnSwitch
                        :btnValue="newTask.isCompleted"
                        :onClick="() => newTask.isCompleted = !newTask.isCompleted"
                    />
                </div>
            </div>
            <div class="w-full p-5 flex justify-center items-center gap-5">
                <BtnPrimary 
                    type="button"
                    :btnValue="'Back'"
                    :btnType="'cancel'"
                    :onClick="() => $router.back()"
                />
                <BtnPrimary 
                    type="submit"
                    :btnValue="'Save'"
                    :btnType="'save'"
                    :onClick="() => {}"
                />
            </div>
        </form>
    </div>
</template>