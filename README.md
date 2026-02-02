# CRUDTASK - Sistema de Gestión de Tareas Académicas

Sistema web completo para gestionar tareas académicas con roles de Usuario y Administrador.

## 🚀 Características

- ✅ Sistema de autenticación (login/registro)
- 👤 Roles: Usuario y Administrador
- 📝 CRUD completo de tareas
- 📊 Dashboard administrativo con métricas
- 🔒 Rutas protegidas por rol
- 💾 Persistencia de sesión con localStorage
- 📱 Diseño responsive con Bootstrap 5

## 📋 Requisitos

- Node.js instalado en tu computadora
- Un navegador web moderno (Chrome, Firefox, Edge)

## 🛠️ Instalación

### Paso 1: Instalar JSON Server

Abre una terminal y ejecuta:

```bash
npm install -g json-server
```

### Paso 2: Descargar el proyecto

Descarga todos los archivos del proyecto en una carpeta llamada `crudtask`

### Paso 3: Iniciar el servidor JSON

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
json-server --watch db.json
```

El servidor se iniciará en `http://localhost:3000`

### Paso 4: Abrir la aplicación

1. Abre el archivo `index.html` en tu navegador
2. O usa Live Server en VS Code para mejor experiencia

## 👥 Usuarios de prueba

### Administrador
- **Email:** admin@crudtask.com
- **Contraseña:** admin123

### Usuario
- **Email:** juan@estudiante.com
- **Contraseña:** user123

## 📂 Estructura del proyecto

```
crudtask/
│
├── index.html              # Página de login/registro
├── db.json                 # Base de datos JSON
│
├── pages/
│   ├── user-dashboard.html    # Dashboard de usuario
│   ├── user-profile.html      # Perfil de usuario
│   ├── admin-dashboard.html   # Dashboard de administrador
│   └── admin-tasks.html       # Gestión de tareas (admin)
│
├── css/
│   └── styles.css          # Estilos personalizados
│
└── js/
    ├── auth.js             # Autenticación
    ├── user-tasks.js       # Gestión de tareas (usuario)
    ├── user-profile.js     # Perfil de usuario
    ├── admin-dashboard.js  # Dashboard admin
    └── admin-tasks.js      # Gestión de tareas (admin)
```

## 🎯 Funcionalidades por Rol

### Usuario (user)
- ✅ Registrarse en el sistema
- ✅ Iniciar sesión
- ✅ Ver sus propias tareas
- ✅ Crear nuevas tareas
- ✅ Editar sus tareas
- ✅ Eliminar sus tareas
- ✅ Cambiar estado de tareas (pendiente, en progreso, completada)
- ✅ Ver su perfil con estadísticas

### Administrador (admin)
- ✅ Iniciar sesión
- ✅ Ver dashboard con métricas del sistema
- ✅ Ver todas las tareas de todos los usuarios
- ✅ Editar cualquier tarea
- ✅ Eliminar cualquier tarea
- ✅ Ver lista de usuarios registrados

## 🔐 Reglas de Seguridad

- Los usuarios solo pueden ver y gestionar sus propias tareas
- Los administradores pueden ver y gestionar todas las tareas
- No se puede acceder a páginas sin iniciar sesión
- Los usuarios no pueden acceder a páginas de administrador
- Los administradores no pueden acceder a páginas de usuario

## 🎨 Tecnologías Utilizadas

- HTML5
- CSS3
- Bootstrap 5
- JavaScript Vanilla (sin frameworks)
- JSON Server (API REST falsa)
- LocalStorage (persistencia de sesión)

## 📝 Notas Importantes

1. **Servidor JSON Server:** Debe estar ejecutándose en `http://localhost:3000` para que la aplicación funcione.

2. **Persistencia:** Los datos se guardan en el archivo `db.json`. Si quieres resetear los datos, simplemente edita o reemplaza este archivo.

3. **Sesión:** La sesión se guarda en localStorage del navegador. Para cerrar sesión completamente, usa el botón "Cerrar Sesión".

## 🐛 Solución de Problemas

### Error: No se pueden cargar las tareas
- Verifica que JSON Server esté ejecutándose
- Revisa la consola del navegador para ver errores específicos

### No puedo iniciar sesión
- Verifica que estés usando las credenciales correctas
- Asegúrate de que el servidor esté corriendo

### Las páginas no cargan correctamente
- Abre la consola del navegador (F12) y busca errores
- Verifica que todos los archivos estén en las carpetas correctas

## 👨‍💻 Desarrollo

Este proyecto fue creado con fines educativos, usando código simple y fácil de entender para estudiantes que están aprendiendo desarrollo web.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.
