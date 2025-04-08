interface States {
    darkMode: boolean,
    tasks: Task[]
}

export const useDefaults = defineStore('defaults', {
    state: (): States => ({
        darkMode: false,
        tasks: [
            {
                title: "Going To Gym",
                isDone: true
            },
            {
                title: "Eating Lunch",
                isDone: false
            },
            {
                title: "Studying Hard",
                isDone: false
            },
        ]
    }),
    actions: {
        defaultDarkMode() {
            const isDarkMode: string|null = localStorage.getItem('darkMode');
            if (typeof isDarkMode === 'string')
                this.darkMode = (localStorage.getItem('darkMode') === 'true')
        },

        defaultTasks() {
            const tasks: string|null = localStorage.getItem('tasks');
            if (tasks)
                this.tasks = JSON.parse(localStorage.getItem('tasks')!)
        },

        setDarkMode() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('darkMode', this.darkMode.toString());
        },

        addTask(val: Task) {
            this.tasks.push(val);
            saveTasks(this.tasks);
        },

        done(index: number) {
            this.tasks[index].isDone = !this.tasks[index].isDone;
            saveTasks(this.tasks);
        },

        doneAll() {
            this.tasks.forEach(item => {
                item.isDone = true;
            });
            saveTasks(this.tasks);
        },
        
        removeTask(index: number) {
            this.tasks.splice(index, 1);
            saveTasks(this.tasks);
        },

        removeAll() {
            this.tasks = [];
            saveTasks(this.tasks);
        },
    },
    getters: {
        getDarkMode: state => state.darkMode,
        getTasks: state => state.tasks,
    }
})