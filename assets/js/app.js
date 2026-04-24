const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-title");
const taskList = document.getElementById("task-list");
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const editInput = document.getElementById("edit-task-title");
const cancelEditButton = document.getElementById("cancel-edit");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingTaskId = null;

// Gestión de creación de tareas

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

// Acciones de tarea: eliminar, completar y editar

const removeTask = (taskId) => {
    if (!Number.isSafeInteger(taskId)) return;
    tasks = tasks.filter(task => task.id !== taskId);
    saveTask();
    renderTasks();
};

const toggleTask = (taskId) => {
    if (!Number.isSafeInteger(taskId)) return;
    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
    );
    saveTask();
    renderTasks();
};

const openEditModal = (taskId) => {
    if (!Number.isSafeInteger(taskId)) return;
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (!taskToEdit) return;

    editingTaskId = taskId;
    editInput.value = taskToEdit.title;
    editModal.classList.remove("hidden");
    editInput.focus();
};

const closeEditModal = () => {
    editingTaskId = null;
    editForm.reset();
    editModal.classList.add("hidden");
};

const editTask = (taskId, title) => {
    if (!Number.isSafeInteger(taskId)) return;

    const normalizedTitle = title.trim();
    if (normalizedTitle === "") return;

    tasks = tasks.map(task =>
        task.id === taskId
            ? { ...task, title: normalizedTitle }
            : task
    );

    saveTask();
    renderTasks();
};

// Gestión del modal de edición

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!Number.isSafeInteger(editingTaskId)) return;

    editTask(editingTaskId, editInput.value);
    closeEditModal();
});

cancelEditButton.addEventListener("click", closeEditModal);

editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !editModal.classList.contains("hidden")) {
        closeEditModal();
    }
});

// Persistencia y renderizado

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

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add("edit-btn");
        editButton.title = "Editar tarea";
        editButton.textContent = "✏️";
        editButton.dataset.taskId = String(task.id);
        editButton.addEventListener("click", () => openEditModal(Number(editButton.dataset.taskId)));
        taskActions.appendChild(editButton);

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