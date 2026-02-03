// user-tasks.js - Gestión de tareas del usuario

const API_URL = 'http://localhost:3000';
let currentUser = null;
let editingTaskId = null;

// Verificar autenticación
window.addEventListener('DOMContentLoaded', function () {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    window.location.href = '../index.html';
    return;
  }

  // Verificar que sea usuario
  if (currentUser.role !== 'user') {
    window.location.href = 'admin-dashboard.html';
    return;
  }

  // Mostrar nombre del usuario
  document.getElementById('userName').textContent = currentUser.name;

  // Cargar tareas
  loadTasks();
  loadDashboardData();
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = '../index.html';
});


async function loadDashboardData() {
    try {
        const response = await fetch(`${API_URL}/tasks?userId=${currentUser.id}`);
        const tasks = await response.json();
        
        // Calcular métricas
        const total = tasks.length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        
        // Mostrar métricas
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('inProgressTasks').textContent = inProgress;
        document.getElementById('completedTasks').textContent = completed;
    } catch (error) {
        console.error('Error al cargar métricas:', error);
    }
}

// Cargar tareas del usuario
async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks?userId=${currentUser.id}`);
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error('Error al cargar tareas:', error);
    document.getElementById('tasksContainer').innerHTML =
      '<p class="text-center text-danger">Error al cargar las tareas</p>';
  }
}

// Mostrar tareas
function displayTasks(tasks) {
  const container = document.getElementById('tasksContainer');

  if (tasks.length === 0) {
    container.innerHTML =
      '<p class="text-center text-muted">No tienes tareas registradas</p>';
    return;
  }

  let html = '';
  tasks.forEach(task => {
    const statusBadge = getStatusBadge(task.status);

    html += `
      <div class="card task-card ${task.status} mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <h5 class="card-title">${task.title}</h5>
              <p class="card-text">${task.description}</p>
              <small class="text-muted">Creada: ${task.createdAt || 'N/A'}</small>
            </div>
            <div>
              ${statusBadge}
            </div>
          </div>
          <div class="mt-3">
            <button 
              class="btn btn-sm btn-primary btn-edit"
              data-id="${task.id}">
              Editar
            </button>
            <button 
              class="btn btn-sm btn-danger btn-delete"
              data-id="${task.id}">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Listener global para botones dinámicos
document.addEventListener('click', e => {

  if (e.target.classList.contains('btn-edit')) {
    const taskId = e.target.dataset.id;
    editTask1(taskId);
  }

  if (e.target.classList.contains('btn-delete')) {
    const taskId = e.target.dataset.id;
    deleteTask(taskId);
  }

});

// Obtener badge según estado
function getStatusBadge(status) {
  const badges = {
    pending: '<span class="badge bg-warning status-badge">Pendiente</span>',
    in_progress: '<span class="badge bg-info status-badge">En Progreso</span>',
    completed: '<span class="badge bg-success status-badge">Completada</span>'
  };
  return badges[status] || '<span class="badge bg-secondary">Desconocido</span>';
}

// Abrir modal para nueva tarea
document.getElementById('newTaskBtn').addEventListener('click', function () {
  editingTaskId = null;
  document.getElementById('modalTitle').textContent = 'Nueva Tarea';
  document.getElementById('taskForm').reset();
  document.getElementById('taskStatus').value = 'pending';
});

// Editar tarea
async function editTask1(taskId) {
  editingTaskId = taskId;

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);
    const task = await response.json();

    document.getElementById('modalTitle').textContent = 'Editar Tarea';
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskStatus').value = task.status;

    const modal = new bootstrap.Modal(
      document.getElementById('taskModal')
    );
    modal.show();
  } catch (error) {
    console.error('Error al cargar tarea:', error);
    alert('Error al cargar la tarea');
  }
}

// Eliminar tarea
async function deleteTask(taskId) {
  if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      loadTasks();
    } else {
      alert('Error al eliminar la tarea');
    }
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    alert('Error al eliminar la tarea');
  }
}

// Guardar tarea (crear o actualizar)
document.getElementById('saveTaskBtn').addEventListener('click', async function () {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const status = document.getElementById('taskStatus').value;

  if (!title || !description) {
    alert('Por favor completa todos los campos');
    return;
  }

  const taskData = {
    title,
    description,
    status,
    userId: currentUser.id,
    createdAt: new Date().toISOString().split('T')[0]
  };

  try {
    let response;

    if (editingTaskId) {
      response = await fetch(`${API_URL}/tasks/${editingTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...taskData, id: editingTaskId })
      });
    } else {
      response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
    }

    if (response.ok) {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById('taskModal')
      );
      modal.hide();
      loadTasks();
    } else {
      alert('Error al guardar la tarea');
    }
  } catch (error) {
    console.error('Error al guardar tarea:', error);
    alert('Error al guardar la tarea');
  }
});