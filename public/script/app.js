fetch('http://localhost:8080/api/users')
.then(response =>{
    if(!response.ok){
        return Promise.reject(response.json());
    }
    return response.json();
})
.then(users => {
    console.log(users);
    var userTable = users.map(user => {
        return `<tr><td>${user.nombre}</td></tr>`;
    })
    userTable.unshift(`<tr>
    <th>Nombre</th>
    <th>Apellido paterno</th>
    <th>Apellido materno</th>
    <th>Correo</th>
</tr>`);
    var tabla = document.querySelector('#tabla');
    tabla.innerHTML = userTable.join('');
})
.catch(error => console.log(error));