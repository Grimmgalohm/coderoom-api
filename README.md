# Coderoom API
## Requerimientos

  * NodeJS
  * MongoDB
  * Postman(https://www.getpostman.com/apps)
   
## ¿Qué debes hacer?
1. Clona este repositorio `git clone https://github.com/CodeRoomMX/coderoom-api.git`

2. En la terminal ve a la carpeta clonada, y usando el comando `npm install`, instala las bibliotecas de código necesarias:
  * [**express**](https://www.npmjs.com/package/express)
  * [**mongoose**](https://www.npmjs.com/package/mongoose)
  * [**bcryptjs**](https://www.npmjs.com/package/bcryptjs)
  * [**body-parser**](https://www.npmjs.com/package/body-parser)

3. Corre `mongod` en otra ventana.

4. El código ya escrito en `index.js` te muestra como usar la biblioteca `express` que responde al método GET, para ejecutarlo es necesario que utilices el comando `npm start`.

5. Completa el código para que puedas completar la [RESTFul API](https://www.oreilly.com/learning/how-to-design-a-restful-api-architecture-from-a-human-language-spec) con los métodos siguientes:

## API Endpoints

### `Users`

#### `GET /api/users`
Obtener todos los usuarios disponibles.

#### `GET /api/users/:id`
Obtener el usuario señalado por el id.

#### `POST /api/users`
Crear un nuevo usuario.
_Request body_
```
{
    username: string, required
    email: string, required
    password: string, required
}
```

#### `PUT /api/users/:id`
Modificar el usuario identificado por el id.
_Request body_
```
{
    username: string, required
    password: string, required
}
```

#### `DELETE /api/users/:id`
Borrar el usuario identificado por el id.

**Es importante que en cualquier momento que modifiques el password, este sea encriptado con bcrypt.**

6. Procura ir probando tus endpoints uno a uno, para evitar tener que construir un cliente que consuma esos servicios, usaremos la herramienta postman que nos permite hacer estas consultas a cualquier API de manera rápida y sencilla.