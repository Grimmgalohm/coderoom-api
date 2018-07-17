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
        <td><button data-userid=${user._id}>Borrar</button></td>
        </tr>`
    })
    userTable.unshift(`<tr>
    <th>Nombre</th>
    <th>Apellido paterno</th>
    <th>Apellido materno</th>
    <th>Correo</th>
    <th></th>
    </tr>`);
    var tabla = document.querySelector('#tabla');
    tabla.innerHTML = userTable.join('');
}

const tabla = document.querySelector('#tabla');
tabla.addEventListener('click', function(e){
    e.preventDefault();
    //console.log('Click', e.currentTarget, e.target, e.target.innerHTML);
    if(e.target.innerHTML.trim() === "Borrar"){
        //console.log('Este es el bueno');
        //console.log(e.target.dataset.userid);

        var uid = e.target.dataset.userid;
        
        fetch(`http://localhost:8080/api/users/${uid}`,{
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }).then(response =>{
        if(!response.ok){
            return Promise.reject(response.json());
        }
       _users = _users.filter(user => user._id !== uid);
        render();
    }).catch(error => console.log(error));
}
});

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