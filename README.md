# CRUDTASK - Sistema de Gestión de Tareas Académicas

En este archivo encontraras una pagina web para creacion de tareas contando con dos tipos de usuarios (admin y user)

##  Características

-  Sistema de autenticación (login/registro)
-  Roles: Usuario y Administrador
-  CRUD completo de tareas
-  Dashboard administrativo con métricas
-  Rutas protegidas por rol
-  Persistencia de sesión con localStorage
-  Diseño responsive con Bootstrap 5


##  Usuarios de prueba
Encontraras dos usuarios de prueba los cuales son los siguientes:
### Administrador
- **Email:** admin@crudtask.com
- **Contraseña:** admin123

### Usuario
- **Email:** prueba@gmail.com
- **Contraseña:** 123

Recuerda que puedes crear más, pero seran de tipo USER, si quieres ir al panel de admin tendras que usar al administrador o crear otro manuelmente en db.json

##  Funcionalidades por Rol

### Usuario (user)
-  Registrarse en el sistema
-  Iniciar sesión
-  Ver sus propias tareas
-  Crear nuevas tareas
-  Editar sus tareas
-  Eliminar sus tareas
-  Cambiar estado de tareas (pendiente, en progreso, completada)
-  Ver su perfil con estadísticas

### Administrador (admin)
-  Iniciar sesión
-  Ver dashboard con métricas del sistema
-  Ver todas las tareas de todos los usuarios
-  Editar cualquier tarea
-  Eliminar cualquier tarea
-  Ver lista de usuarios registrados


## Tecnologías Utilizadas

- HTML5
- CSS
- Bootstrap 5
- JavaScript Vanilla 
- JSON Server
- LocalStorage

##  Notas Importantes

1. **Servidor JSON Server:** Debe estar ejecutándose en `http://localhost:3000` para que la aplicación funcione. de no ser asi, cambia todas las API al servidor dado

2. **Sesión:** La sesión se guarda en localStorage del navegador. Para cerrar sesión completamente, usa el botón "Cerrar Sesión" o elimina directamente desde el local (No recomendado).
