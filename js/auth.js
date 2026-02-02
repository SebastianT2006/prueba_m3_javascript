// auth.js - Manejo de autenticación

const API_URL = 'http://localhost:3000';

// Verificar si ya hay sesión activa
window.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // Si ya hay sesión, redirigir según el rol
        if (currentUser.role === 'admin') {
            window.location.href = './pages/admin-dashboard.html';
        } else {
            window.location.href = "./pages/prueba.html";
        }
    }
});

// Mostrar/ocultar formulario de registro
document.getElementById('showRegisterBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerFormContainer').style.display = 'block';
    document.getElementById('showRegisterBtn').style.display = 'none';
});

document.getElementById('hideRegisterBtn').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerFormContainer').style.display = 'none';
    document.getElementById('showRegisterBtn').style.display = 'block';
});

// Manejo del login
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // Buscar usuario en la API
        const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
        const users = await response.json();
        
        if (users.length > 0) {
            const user = users[0];
            
            // Guardar sesión en localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showMessage('Inicio de sesión exitoso', 'success');
            
            // Redirigir según el rol
            
                if (user.role === 'admin') {
                    Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                    });
                    window.location.href = 'pages/admin-dashboard.html';
                } else {
                    window.location.href = 'pages/user-dashboard.html';
                }
            
        } else {
            showMessage('Email o contraseña incorrectos', 'danger');
        }
    } catch (error) {
        showMessage('Error al iniciar sesión. Verifica que el servidor esté funcionando.', 'danger');
        console.error(error);
    }
});

// Manejo del registro
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        // Verificar si el email ya existe
        const checkResponse = await fetch(`${API_URL}/users?email=${email}`);
        const existingUsers = await checkResponse.json();
        
        if (existingUsers.length > 0) {
            showMessage('Este email ya está registrado', 'warning');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            name: name,
            email: email,
            password: password,
            role: 'user' // Siempre se asigna rol user al registrarse
        };
        
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        
        if (response.ok) {
            showMessage('Registro exitoso. Ya puedes iniciar sesión.', 'success');
            
            // Limpiar formulario
            document.getElementById('registerForm').reset();
            
            // Volver al login
            setTimeout(() => {
                document.getElementById('hideRegisterBtn').click();
            }, 2000);
        } else {
            showMessage('Error al registrar usuario', 'danger');
        }
    } catch (error) {
        showMessage('Error al registrar. Verifica que el servidor esté funcionando.', 'danger');
        console.error(error);
    }
});

// Función para mostrar mensajes
function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 5000);
}
