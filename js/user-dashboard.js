// admin-dashboard.js - Dashboard del administrador

const API_URL = 'http://localhost:3000';
let currentUser = null;

// Verificar autenticación
window.addEventListener('DOMContentLoaded', function() {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = '../index.html';
        return;
    }
    
    // Verificar que sea administrador
    if (currentUser.role !== 'user') {
        window.location.href = 'user-dashboard.html';
        return;
    }
    
    // Mostrar nombre del admin
    document.getElementById('adminName').textContent = currentUser.name;
    
    // Cargar datos del dashboard
    loadDashboardData();
    loadUsers();
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
});

// Cargar datos del dashboard
async function loadDashboardData() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
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

// Cargar lista de usuarios
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        
        displayUsers(users);
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        document.getElementById('usersTableBody').innerHTML = 
            '<tr><td colspan="4" class="text-center text-danger">Error al cargar usuarios</td></tr>';
    }
}

// Mostrar usuarios en la tabla
function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No hay usuarios registrados</td></tr>';
        return;
    }
    
    let html = '';
    users.forEach(user => {
        const roleBadge = user.role === 'admin' 
            ? '<span class="badge bg-danger">Admin</span>' 
            : '<span class="badge bg-info">Usuario</span>';
        
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${roleBadge}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}
