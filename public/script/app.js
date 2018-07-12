var create = document.querySelector('form');
var _users;

fetch('http://localhost:8080/api/users')
.then(response =>{
    if(!response.ok){
        return Promise.reject(response.json());
    }
    return response.json();
})
.then(users => {
    console.log(users);
    _users = users;
    render();
}).catch(error => console.log(error));

function render(){
    var userTable = _users.map(user => {
        return `<tr>
        <td>${user.nombre}</td>
        <td>${user.apellido1}</td>
        <td>${user.apellido2}</td>
        <td>${user.email}</td>
        </tr>`
    })
    userTable.unshift(`<tr>
    <th>Nombre</th>
    <th>Apellido paterno</th>
    <th>Apellido materno</th>
    <th>Correo</th>
    </tr>`);
    var tabla = document.querySelector('#tabla');
    tabla.innerHTML = userTable.join('');
}

create.addEventListener('submit', function(e){
    e.preventDefault();

    var nombre = create.nombre.value;
    var apellido1 = create.apellido1.value;
    var apellido2 = create.apellido2.value;
    var email = create.email.value;
    var password = create.password.value;

    fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({nombre, apellido1, apellido2, email, password})
    })
    .then(response =>{
        if(!response.ok){
            return Promise.reject(response.json());
        }
        return response.json();
    })
    .then(user => {
        _users.push(user);
        render();
        create.reset();
    })
    .catch(error => console.log(error));
})

