# API de Tareas - Practica API Nayeli

## Descripción

Proyecto de una API REST desarrollada con Node.js y Express para administrar tareas.

La API permite:
- Crear tareas.
- Consultar tareas.
- Actualizar tareas.
- Eliminar tareas.

También cuenta con validación de datos, seguridad mediante Helmet y conexión HTTPS.

## Tecnologías utilizadas

- Node.js
- Express
- Express Validator
- Helmet
- Morgan
- Postman

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO

Instalar las dependencias:

npm install
Ejecución

Para iniciar el servidor:

npm start

El API estará disponible en:

https://localhost:3000
Endpoints del API
Obtener todas las tareas

Método: GET

/api/tareas
Obtener una tarea por ID

Método: GET

/api/tareas/:id

Ejemplo:

/api/tareas/1
Crear una tarea

Método: POST

/api/tareas

Ejemplo de datos enviados:

{
  "titulo": "Realizar documentación",
  "completada": false
}
Actualizar una tarea

Método: PUT

/api/tareas/:id

Ejemplo:

/api/tareas/1
Eliminar una tarea

Método: DELETE

/api/tareas/:id

Ejemplo:

/api/tareas/1
Validaciones y seguridad

El proyecto utiliza express-validator para validar la información recibida en los endpoints.

También implementa:

Helmet para mejorar la seguridad del servidor.
HTTPS con certificado autofirmado.
Validación de datos enviados por el usuario.
Documentación con Postman

Se incluye una colección de Postman con las pruebas de los endpoints:

GET - Listar todas las tareas.
GET - Buscar tarea por ID.
POST - Crear tarea.
PUT - Actualizar tarea.
DELETE - Eliminar tarea.