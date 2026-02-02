// admin-tasks.js - Gestión de tareas del administrador

const API_URL = 'http://localhost:3000';
let currentUser = null;
let editingTaskId = null;

// Verificar autenticación
window.addEventListener('DOMContentLoaded', function() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = '../index.html';
        return;
    }
    
    // Verificar que sea administrador
    if (currentUser.role !== 'admin') {
        window.location.href = 'user-dashboard.html';
        return;
    }
    
    // Mostrar nombre del admin
    document.getElementById('adminName').textContent = currentUser.name;
    
    // Cargar todas las tareas
    loadAllTasks();
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Cargar todas las tareas del sistema
async function loadAllTasks() {
    try {
        const [tasksResponse, usersResponse] = await Promise.all([
            fetch(`${API_URL}/tasks`),
            fetch(`${API_URL}/users`)
        ]);
        
        const tasks = await tasksResponse.json();
        const users = await usersResponse.json();
        
        // Crear un mapa de usuarios para mostrar nombres
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user.name;
        });
        
        displayTasks(tasks, userMap);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        document.getElementById('tasksContainer').innerHTML = 
            '<p class="text-center text-danger">Error al cargar las tareas</p>';
    }
}

// Mostrar tareas
function displayTasks(tasks, userMap) {
    const container = document.getElementById('tasksContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">No hay tareas registradas en el sistema</p>';
        return;
    }
    
    let html = '';
    tasks.forEach(task => {
        const statusBadge = getStatusBadge(task.status);
        const userName = userMap[task.userId] || 'Usuario desconocido';
        
        html += `
            <div class="card task-card ${task.status} mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h5 class="card-title">${task.title}</h5>
                            <p class="card-text">${task.description}</p>
                            <small class="text-muted">
                                Usuario: <strong>${userName}</strong> | 
                                Creada: ${task.createdAt || 'N/A'}
                            </small>
                        </div>
                        <div>
                            ${statusBadge}
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-sm btn-warning" onclick="editTask(${task.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Obtener badge según estado
function getStatusBadge(status) {
    const badges = {
        'pending': '<span class="badge bg-warning status-badge">Pendiente</span>',
        'in_progress': '<span class="badge bg-info status-badge">En Progreso</span>',
        'completed': '<span class="badge bg-success status-badge">Completada</span>'
    };
    return badges[status] || '<span class="badge bg-secondary">Desconocido</span>';
}

// Editar tarea
async function editTask(taskId) {
    editingTaskId = taskId;
    
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`);
        const task = await response.json();
        
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskStatus').value = task.status;
        
        // Abrir modal
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    } catch (error) {
        console.error('Error al cargar tarea:', error);
        alert('Error al cargar la tarea');
    }
}

// Eliminar tarea
async function deleteTask(taskId) {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadAllTasks();
        } else {
            alert('Error al eliminar la tarea');
        }
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        alert('Error al eliminar la tarea');
    }
}

// Guardar cambios en tarea
document.getElementById('saveTaskBtn').addEventListener('click', async function() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;
    
    if (!title || !description) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    try {
        // Obtener la tarea actual para mantener userId
        const taskResponse = await fetch(`${API_URL}/tasks/${editingTaskId}`);
        const currentTask = await taskResponse.json();
        
        const taskData = {
            ...currentTask,
            title: title,
            description: description,
            status: status
        };
        
        const response = await fetch(`${API_URL}/tasks/${editingTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        if (response.ok) {
            // Cerrar modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
            modal.hide();
            
            // Recargar tareas
            loadAllTasks();
        } else {
            alert('Error al guardar la tarea');
        }
    } catch (error) {
        console.error('Error al guardar tarea:', error);
        alert('Error al guardar la tarea');
    }
});
