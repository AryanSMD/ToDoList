export const saveTasks = (val: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(val));
}