<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import { useTasksStore } from '@/stores/tasks';
import Swal from 'sweetalert2';

const store = useTasksStore();
const props = defineProps<{
  task: Task
}>();

function removeTask(id: number) {
  Swal.fire({
    title: "Warning",
    text: "Are you sure to delete this Task?",
    icon: "warning",
    background: store.darkMode ? 'var(--color-darkColor)' : 'white',
    color: store.darkMode ? 'var(--color-darkText)' : 'var(--color-text)',
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "grey",
    confirmButtonText: "Delete"
  }).then(result => {
    if (result.isConfirmed) {
      store.removeTask(id);
      Swal.fire({
        title: "Task Deleted!",
        icon: "success",
        background: store.darkMode ? 'var(--color-darkColor)' : 'white',
        color: store.darkMode ? 'var(--color-darkText)' : 'var(--color-text)',
      });
    }
  });
}
</script>

<template>
  <div 
    class="w-full px-2 py-3 flex items-center justify-between gap-[2px] transition-colors duration-300"
    :class="props.task.isCompleted && 'bg-bg dark:bg-darkBg'"
  >
    <div 
      class="cursor-pointer w-full transition-transform duration-300 truncate"
      :class="props.task.isCompleted ? 'line-through translate-x-0' : 'translate-x-[-35px]'"
    >
      <input
        :id="props.task.id.toString()"
        type="checkbox"
        :checked="props.task.isCompleted"
        @click.prevent
      >
      <label :for="props.task.id.toString()">{{ props.task.description }}</label>
    </div>
    <div class="w-auto flex items-center gap-1 lg:gap-2">
      <button 
        class="btn !w-[80px] md:!w-[100px] lg:!w-[110px] font-medium text-white  
          p-[2px] lg:p-1 rounded-md text-[.7rem] md:text-[.8rem] lg:text-[.9rem]"
        :class="props.task.isCompleted ? 'bg-primary' : 'bg-slate-400'"
        @click="store.completeTask(props.task.id);"
      >
        {{ props.task.isCompleted ? 'Completed' : 'Not Completed' }}
      </button>
      <button 
        class="btn edit text-text dark:text-darkText" 
        @click="$router.push({ name: 'edit', params: { id: task.id } })"
      >
        <IconEdit />
      </button>
      <button 
        class="btn delete text-text dark:text-darkText" 
        @click="removeTask(task.id)"
      >
        <IconTrash />
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 19px;
  height: auto;
  cursor: pointer;
}
.btn.edit:hover {
  color: var(--color-primary) !important;
}
.btn.delete:hover {
  color: var(--color-red-500) !important;
}
@media (min-width:724px) {
  .btn {
    width: 25px;
  }
}
</style>