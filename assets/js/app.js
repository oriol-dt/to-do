const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-title");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();

    if (text === "") return;

    const newTask = {
        id: Date.now(),
        title: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";

    saveTask();
    renderTasks();
});

function removeTask(taskId) {
    if (!Number.isSafeInteger(taskId)) return;
    tasks = tasks.filter(task => task.id !== taskId);
    saveTask();
    renderTasks();
}

function toggleTask(taskId) {
    if (!Number.isSafeInteger(taskId)) return;
    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
    );
    saveTask();
    renderTasks();
}

const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        if (task.completed) li.classList.add("completed");

        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");

        const taskText = document.createElement("span");
        taskText.classList.add("task-text");
        taskText.textContent = task.title;

        taskContent.appendChild(taskText);

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.classList.add("toggle-btn");
        toggleButton.title = task.completed ? "Marcar como pendiente" : "Marcar como completada";
        toggleButton.textContent = task.completed ? "↩️" : "✅";
        toggleButton.dataset.taskId = String(task.id);
        toggleButton.addEventListener("click", () => toggleTask(Number(toggleButton.dataset.taskId)));
        taskActions.appendChild(toggleButton);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.classList.add("remove-btn");
        removeButton.title = "Eliminar tarea";
        removeButton.textContent = "❌";
        removeButton.dataset.taskId = String(task.id);
        removeButton.addEventListener("click", () => removeTask(Number(removeButton.dataset.taskId)));
        taskActions.appendChild(removeButton);

        li.appendChild(taskContent);
        li.appendChild(taskActions);
        taskList.appendChild(li);
    });
};

saveTask();
renderTasks();