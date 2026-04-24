## App de Tareas (To-Do)

Aplicación web sencilla para gestionar tareas desde el navegador.

### Funcionalidades
- Crear tareas.
- Marcar tareas como completadas o volverlas a pendiente.
- Editar tareas mediante modal.
- Eliminar tareas.
- Persistencia en `localStorage`.

### Estructura principal
- `index.html`: interfaz principal de la app.
- `assets/js/app.js`: lógica del CRUD de tareas y renderizado.
- `assets/css/to-do.css`: estilos de la app.

### Cómo usar
1. Abre `index.html` en tu navegador.
2. Escribe una tarea y pulsa **Crear**.
3. Usa los botones de cada tarea para completar/revertir, editar o eliminar.

### Notas
- Las tareas se guardan en el navegador mediante `localStorage`.
- Si limpias los datos del sitio en el navegador, las tareas se perderán.
