document.addEventListener('DOMContentLoaded', function () {
    // Clase que representa una tarea 
    class Task {
        constructor(id, description) {
            this._id = id;
            this._description = description; 
        }
        get description() {
            return this._description; 
        }
        set description(newDescription) {
            this._description = newDescription; 
        }
        get id() {
            return this._id; 
        }
    }

    // Clase que gestiona las tareas 
    class TaskManager {
        constructor() {
            this.tasks = []; 
            this.idCounter = 1; 
        }
        // Método para crear nuevas tareas 
        createTask(description) {
            const newTask = new Task(this.idCounter++, description);
            this.tasks.push(newTask); 
            this.saveTaskAtCookies(newTask); 
            return newTask; 
        }
        // Método para guardar tareas en las cookies 
        saveTaskAtCookies(task) {
            document.cookie = `${task.id}=${task.description}; path=/;`;
        }
        // Método para eliminar tareas
        deleteTask(task) {
            document.cookie = task.id + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Deletes the task cookie
            this.tasks = this.tasks.filter(t => t.id !== task.id); 
        }
        // Método para obtener una tarea por su ID
        getTask(id) {
            return this.tasks.find(t => t.id === id); 
        }
    }

    const taskManager = new TaskManager();
    const tableBody = document.getElementById("table-body"); 
    const modalTitle = document.getElementById('exampleModalLabel'); 
    const descriptionInput = document.getElementById('description'); 
    const saveButton = document.getElementById('btn-saveTask'); 
    const createModalBtn = document.getElementById('btn-createModal');
    let currentTaskId; 
    let deletingTask = false;

    // Evento al pulsar el botón de crear tarea 
    createModalBtn.addEventListener('click', function () {
        // Resetear modal
        deletingTask = false;
        resetModal("Agregar Tarea", "Agregar", "btn-primary");
        document.getElementById('p-delete').style.display = 'none';
        document.getElementById('modal-description').style.display = 'block';
        descriptionInput.value = ''; 
        currentTaskId = null; 
    });

    // Evento al pulsar el botón de guardar tarea 
    saveButton.addEventListener("click", () => {
        const taskDescription = descriptionInput.value; 
        if (taskDescription) {
            if (currentTaskId === null) {
                const newTask = taskManager.createTask(taskDescription); 
                addRow(newTask); 
            } else {
                const taskToEdit = taskManager.getTask(currentTaskId); 
                taskToEdit.description = taskDescription; 
                updateRow(taskToEdit); 
            }
            const modal = bootstrap.Modal.getInstance(document.getElementById('modal')); 
            modal.hide(); 
        }
    });

    // Función para agregar una fila a la tabla
    function addRow(task) {
        const row = document.createElement('tr'); 
        row.setAttribute('id', task.id); 
        const tdId = document.createElement('td'); 
        tdId.textContent = task.id; 
        const tdDescription = document.createElement('td'); 
        tdDescription.textContent = task.description; 
        const tdActions = document.createElement('td'); 
        
        // Creating the edit button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary'; 
        editButton.type = 'button';
        editButton.textContent = 'Editar'; 

        // Creación del botón de editar 
        editButton.addEventListener('click', () => {
            deletingTask = false;
            modalTitle.textContent = 'Editar Tarea'; 
            descriptionInput.value = task.description; 
            currentTaskId = task.id; 
            resetModal("Editar Tarea", "Editar", "btn-primary"); // Reset modal for editing
            document.getElementById('p-delete').style.display = 'none';
            document.getElementById('modal-description').style.display = 'block';
            const modal = new bootstrap.Modal(document.getElementById('modal')); 
            modal.show(); 
        });

        // Creación del botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.type = 'button';
        deleteButton.textContent = 'Eliminar'; 

        // Evento para el botón de eliminar 
        deleteButton.addEventListener('click', () => {
            deletingTask = true;
            const modalDeleteText = document.getElementById('p-delete');
            modalDeleteText.textContent = `¿Estás seguro de que deseas eliminar la tarea con ID: ${task.id}?`; 
            document.getElementById('modal-description').style.display = 'none';
            document.getElementById('p-delete').style.display = 'block';
            modalTitle.textContent = 'Confirmar Eliminación';
            resetModal("Confirmar Eliminación", "Eliminar", "btn-danger"); 
            currentTaskId = task.id; 
            if (deletingTask){
                saveButton.onclick = function () {
                    taskManager.deleteTask(task); 
                    row.remove(); 
                    const modal = bootstrap.Modal.getInstance(document.getElementById('modal')); 
                    modal.hide(); 
                };
            }
            
            const modal = new bootstrap.Modal(document.getElementById('modal'));
            modal.show(); 
        });

        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);
        row.appendChild(tdId);
        row.appendChild(tdDescription);
        row.appendChild(tdActions);
        tableBody.appendChild(row);
    }

    // Función para actualizar una fila en la tabla 
    function updateRow(task) {
        const row = document.getElementById(task.id); 
        if (row) {
            row.cells[1].textContent = task.description; 
        }
    }

    // Función para cargar tareas desde las cookies 
    function loadCookies() {
        const cDecoded = decodeURIComponent(document.cookie); 
        const cArray = cDecoded.split("; "); 
        let maxId = 0; 
        cArray.forEach(element => {
            const [id, description] = element.split("="); 
            if (id && description) {
                const taskId = parseInt(id); 
                taskManager.tasks.push(new Task(taskId, description)); 
                addRow(new Task(taskId, description));
                if (taskId > maxId) {
                    maxId = taskId;
                }
            }
        });
        taskManager.idCounter = maxId + 1;
    }

    // Resetear el modal
    function resetModal(title, buttonText, buttonClass) {
        modalTitle.textContent = title;
        saveButton.textContent = buttonText;
        saveButton.className = `btn ${buttonClass}`;
    }

    // Carga las tareas cuando se inicia el script 
    loadCookies(); 
});