document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Por favor, digite uma tarefa antes de adicionar.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);

        taskInput.value = '';
        taskInput.focus();
    }
});