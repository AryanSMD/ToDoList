<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue';
import BtnPrimary from '@/components/btns/BtnPrimary.vue';
import { vAutoAnimate } from '@formkit/auto-animate'
import { useTasksStore } from '@/stores/tasks';
import Task from '@/components/Task.vue';
import { computed, ref } from 'vue';
import Swal from 'sweetalert2';

const store = useTasksStore();
const search = ref<string>('');
const isSortTypeAZ = ref<boolean>(true);
const filterType = ref<boolean|null>(null);

const sortedTasks = computed(() => {
  if (isSortTypeAZ.value)
    return [...store.tasks].sort((a, b) => a.description.localeCompare(b.description))
  return [...store.tasks].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
})

const filteredTasks = computed(() => {
  if (filterType.value !== null)
    return sortedTasks.value.filter(e => e.isCompleted === filterType.value);
  return sortedTasks.value;
});

const searchedTasks = computed(() =>
  filteredTasks.value.filter(e => e.description.toLowerCase().includes(search.value.toLowerCase())
));

function clearCompleteds() {
  Swal.fire({
    title: "Warning",
    text: "Are you sure to delete all Completeds?",
    icon: "warning",
    background: store.darkMode ? 'var(--color-darkColor)' : 'white',
    color: store.darkMode ? 'var(--color-darkText)' : 'var(--color-text)',
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "grey",
    confirmButtonText: "Delete"
  }).then(result => {
    if (result.isConfirmed) {
      store.clearCompleteds();
      Swal.fire({
        title: "Completeds Deleted!",
        icon: "success",
        background: store.darkMode ? 'var(--color-darkColor)' : 'white',
        color: store.darkMode ? 'var(--color-darkText)' : 'var(--color-text)',
      });
    }
  });
}
</script>

<template>
  <div class="card">
    <div class="title">Tasks</div>
    <div class="absolute top-3 right-3">
      <BtnPrimary 
        :btnValue="'Add'"
        :btnType="'save'"
        :onClick="() => $router.push({ name: 'create' })"
      />
    </div>
    <div class="w-full grid grid-cols-2 gap-2">
      <div>
        <label>Sort</label>
        <select v-model="isSortTypeAZ">
          <option :value="true">A-Z</option>
          <option :value="false">Date</option>
        </select>
      </div>
      <div>
        <label>Filter</label>
        <select v-model="filterType">
          <option :value="null">All</option>
          <option :value="true">Completed</option>
          <option :value="false">Not Completed</option>
        </select>
      </div>
      <div 
        class="w-full border-[1px] border-slate-300 dark:border-slate-600 rounded-md 
          flex items-center justify-between col-span-2"
      >
        <IconSearch class="w-10 h-10 text-slate-400" />
        <input
          type="text"
          v-model="search"
          class="border-none w-full" 
          placeholder="Search by description..."
        >
      </div>
    </div>
      <div 
        v-auto-animate
        class="w-full border-1 border-slate-300 dark:border-slate-600 h-[300px] rounded-md 
          p-2 flex flex-col overflow-x-hidden mt-2 divide-y-1 divide-x-0 divide-slate-300 
          dark:divide-slate-600"
      >
        <Task
          v-for="task in searchedTasks"
          :key="task.id"
          :task="task"
        />
        <div 
          v-if="!searchedTasks.length" 
          class="w-full h-full flex justify-center font-medium items-center text-slate-400"
        >
          No tasks found ...
        </div>
      </div>
    <div class="w-full p-5 flex justify-center items-center gap-5">
      <BtnPrimary 
        :btnValue="'Complete All'"
        :btnType="'w-[120px] md:w-[142px] save'"
        :onClick="store.completeAllTasks"
      />
      <BtnPrimary 
        :btnValue="'Clear Completed'"
        :btnType="'w-[120px] md:w-[142px] del'"
        :onClick="clearCompleteds"
      />
    </div>
  </div>
</template>