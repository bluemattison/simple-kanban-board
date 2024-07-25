document.addEventListener('DOMContentLoaded', () => {
    const backlogForm = document.getElementById('backlog-form');
    const backlogInput = document.getElementById('backlog-input');
    const backlog = document.getElementById('backlog');
    const inProgress = document.getElementById('in-progress');
    const done = document.getElementById('done');

    loadTasks();

    backlogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = backlogInput.value.trim();
        if (taskText) {
            const task = createTaskElement(taskText);
            backlog.appendChild(task);
            backlogInput.value = '';
            saveTasks();
        }
    });

    function createTaskElement(text) {
        const task = document.createElement('li');
        task.className = 'list-group-item';
        task.textContent = text;
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', () => {
            task.remove();
            saveTasks();
        });
        task.appendChild(deleteBtn);
        return task;
    }

    function saveTasks() {
        const tasks = {
            backlog: Array.from(backlog.children).map(task => task.firstChild.textContent),
            inProgress: Array.from(inProgress.children).map(task => task.firstChild.textContent),
            done: Array.from(done.children).map(task => task.firstChild.textContent),
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.backlog.forEach(text => backlog.appendChild(createTaskElement(text)));
            tasks.inProgress.forEach(text => inProgress.appendChild(createTaskElement(text)));
            tasks.done.forEach(text => done.appendChild(createTaskElement(text)));
        }
        makeSortable();
    }

    function makeSortable() {
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
});
