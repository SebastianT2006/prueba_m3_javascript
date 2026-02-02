// user-profile.js - Perfil del usuario

const API_URL = 'http://localhost:3000';
let currentUser = null;

// Verificar autenticación
window.addEventListener('DOMContentLoaded', function() {
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
    
    // Cargar información del perfil
    loadProfile();
    loadStatistics();
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Cargar información del perfil
function loadProfile() {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent = currentUser.role === 'user' ? 'Usuario' : 'Administrador';
}

// Cargar estadísticas de tareas
async function loadStatistics() {
    try {
        const response = await fetch(`${API_URL}/tasks?userId=${currentUser.id}`);
        const tasks = await response.json();
        
        // Calcular estadísticas
        const total = tasks.length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        const inProgress = tasks.filter(t => t.status === 'in_progress').length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        
        // Mostrar estadísticas
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('inProgressTasks').textContent = inProgress;
        document.getElementById('completedTasks').textContent = completed;
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
}
