import { ref, watch } from 'vue';
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
    const darkMode = ref<boolean>(false);
    const tasks= ref<Task[]>([
      {
        id: 1,
        createdAt: '2025-04-18T08:25:28.069Z',
        description: 'Complete morning routine',
        isCompleted: true
      },
      {
        id: 2,
        createdAt: '2025-04-18T08:25:40.069Z',
        description: 'Reply to important emails',
        isCompleted: false
      },
      {
        id: 3,
        createdAt: '2025-04-17T08:25:44.069Z',
        description: 'Take a short walk & stretch',
        isCompleted: false
      },
    ]);

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    };

    function getMode() {
      const isDarkMode = localStorage.getItem('darkMode');
      if (typeof isDarkMode === 'string')
       darkMode.value = (localStorage.getItem('darkMode') === 'true')
    };

    function changeMode() {
      darkMode.value = !darkMode.value;
    };

    function getTasks() {
      const oldTasks = localStorage.getItem('tasks');
      if (oldTasks)
        tasks.value = JSON.parse(localStorage.getItem('tasks')!)
    };

    function getTaskById(id: number) {
      return tasks.value.find(e => e.id === id);
    };

    function findTaskIndex(id: number) {
      return tasks.value.findIndex(e => e.id === id);
    };

    function createTask(val: Task) {
      const ids = tasks.value.map(e => e.id);
      val.id = ids.length ? Math.max(...ids) + 1 : 1;
      val.createdAt = new Date().toISOString();
      tasks.value.push(val);
      saveTasks();
    };

    function updateTask(val: Task, id: number) {
      const index = findTaskIndex(id);
      tasks.value[index] = val;
      saveTasks();
    };

    function completeTask(id: number) {
      const index = findTaskIndex(id);
      tasks.value[index].isCompleted = !tasks.value[index].isCompleted;
      saveTasks();
    };

    function completeAllTasks() {
      tasks.value.forEach(e => {
        e.isCompleted = true;
      });
      saveTasks();
    };
    
    function removeTask(id: number) {
      const index = findTaskIndex(id);
      tasks.value.splice(index, 1);
      saveTasks();
    };

    function clearCompleteds() {
      tasks.value = tasks.value.filter(e => e.isCompleted === false);
      saveTasks();
    };

    watch(darkMode, newVal => {
      if (newVal) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('darkMode', darkMode.value.toString());
    })


    return {
      tasks,
      darkMode,
      getMode,
      getTasks,
      changeMode,
      getTaskById,
      createTask,
      updateTask,
      completeAllTasks,
      completeTask,
      removeTask,
      clearCompleteds
    }
})
