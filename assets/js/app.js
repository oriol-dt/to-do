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

const locationText = document.getElementById('location-text');

// Definimos la función como asíncrona
const getMyLocation = async () => {
    if (!navigator.geolocation) {
        if (locationText) locationText.innerText = "No soportado";
        return;
    }

    // Creamos una Promesa para poder usar 'await' con la API de geolocalización
    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    try {
        // La ejecución se "pausa" aquí de forma asíncrona hasta que el usuario responda
        const position = await getPosition();

        const { latitude, longitude } = position.coords;

        if (locationText) {
            locationText.innerText = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
        }
    } catch (error) {
        console.warn("Error u omisión de geolocalización:", error.message);
        if (locationText) locationText.innerText = "No disponible";
    }
};

// Se lanza sin bloquear el hilo principal
getMyLocation();