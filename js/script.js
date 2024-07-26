document.addEventListener('DOMContentLoaded', () => {
    const newTaskForm = document.getElementById('new-task-form');
    const newTaskInput = document.getElementById('new-task-input');
    const newTask = document.getElementById('new-task');
    const backlog = document.getElementById('backlog');
    const inProgress = document.getElementById('in-progress');
    const done = document.getElementById('done');

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const task = createTaskElement(taskText);
            newTask.appendChild(task);
            newTaskInput.value = '';
            saveTasks();
        }
    });

    function createTaskElement(text) {
        const task = document.createElement('li');
        task.className = 'list-group-item d-flex justify-content-between align-items-center';
        task.textContent = text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn btn btn-sm btn-danger ms-auto';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            task.remove();
            saveTasks();
        });
        task.appendChild(deleteBtn);
        return task;
    }

    function saveTasks() {
        const tasks = {
            newTask: Array.from(newTask.children).map(task => task.firstChild.textContent),
            backlog: Array.from(backlog.children).map(task => task.firstChild.textContent),
            inProgress: Array.from(inProgress.children).map(task => task.firstChild.textContent),
            done: Array.from(done.children).map(task => task.firstChild.textContent),
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.newTask.forEach(text => newTask.appendChild(createTaskElement(text)));
            tasks.backlog.forEach(text => backlog.appendChild(createTaskElement(text)));
            tasks.inProgress.forEach(text => inProgress.appendChild(createTaskElement(text)));
            tasks.done.forEach(text => done.appendChild(createTaskElement(text)));
        }
        makeSortable();
    }

    function makeSortable() {
        new Sortable(newTask, {
            group: 'shared',
            animation: 150,
            onEnd: () => saveTasks(),
        });
        new Sortable(backlog, {
            group: 'shared',
            animation: 150,
            onEnd: () => saveTasks(),
        });
        new Sortable(inProgress, {
            group: 'shared',
            animation: 150,
            onEnd: () => saveTasks(),
        });
        new Sortable(done, {
            group: 'shared',
            animation: 150,
            onEnd: () => saveTasks(),
        });
    }

    loadTasks();
});
