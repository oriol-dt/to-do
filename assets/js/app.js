const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-title");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();

    if (text === '') return;

    const newTask = {
        id: Date.now(),
        title: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = '';

    saveTask();
    renderTasks();
});

const removeTask = () => {

};

const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span class="task-text">${task.title}</span>
            <div class="task-actions">
                <button title="${task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}" class="toggle-btn" onclick="toggleTask(${task.id})">
                    ${task.completed ? "↩️" : "✅"}
                </button> 
                <button title="Eliminar tarea" class="remove-btn" onclick="removeTask(${task.id})">
                    ❌
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

renderTasks();