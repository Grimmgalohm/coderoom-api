//inicia el servidor escribiendo en la consola npm start, deberá aparecer que el servidor está ON
//también el puerto en el que está escuchando las peticiones :D
const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const jsonParser = bodyParser.json();
const directorio = require('./db/directory-db');
const bcrypt = require('bcryptjs');
const colors = require('colors');

const app = express();
app.use(jsonParser);

//para desplegar la lista de elementos de la base de datos (funciona) no necesita status de error
app.get('/api/users', function(req, res){
  directorio.find().then(users =>{
    res.status(200).json(users);
  })
});

//búsqueda por id/ con estatus de error
app.get('/api/users/:id', function(req, res){
  var search = directorio.findOne({_id:req.params.id}).then(user =>{
    if(!user){
      res.status(404).send('NotFound');
    }else{
      res.status(200).json(user)
    }
  })
});

//para crear un usuario en la base de datos
/*
app.post('/api/users', function(req, res){
  bcrypt.hash(req.body.password, 8).then( hash =>{
    directorio.create({
      nombre:req.body.nombre,
      apellido1:req.body.apellido1,
      apellido2:req.body.apellido2,
      email:req.body.email,
      password:hash,
      celphone:req.body.celphone,
      home:req.body.home,
      work:req.body.work,
      emergency:req.body.emergency
    },{new:true}).then(function(user){
      res.status(201).json(user);
    })
  })
});
*/

app.post('/api/users', function(req, res){
  if(!req.params.password || !req.params.nombre){
    return res.status(428).send('Precondition Required');
  }else{
  bcrypt.hash(req.body.password, 8).then( hash =>{
    directorio.create({
      nombre:req.body.nombre,
      apellido1:req.body.apellido1,
      apellido2:req.body.apellido2,
      email:req.body.email,
      password:hash,
      celphone:req.body.celphone,
      home:req.body.home,
      work:req.body.work,
      emergency:req.body.emergency
    },{new:true}).then(function(user){
      res.status(201).json(user);
    })
  })
}
});

//modifica nombre de usuario y contraseña
app.put('/api/users/:id', function(req, res){
  directorio.findOne({_id:req.params.id}).then(user =>{
    bcrypt.hash(req.body.password, 8).then(hash=>{
      directorio.findOneAndUpdate({_id:req.params.id},{nombre:req.body.nombre, password:hash},{new:true})
      .then(function(user){
        res.status(202).json(user)
      })
    })
  })
});
//borra el usuario por id/con estatus de error
app.delete('/api/users/:id', function(req, res){
  var search = directorio.findOne({_id:req.params.id});
  search.then(user =>{
    if(!user){
      return res.status(404).send('NotFound');
    }
    directorio.deleteOne({_id:req.params.id}).then(done =>{
      res.status(204).end();
    })
  })
});

mongoose.connect('mongodb://localhost/directory-cats-test', err => {
  if (err) {
      console.log(err);
  }
  app.listen(8080, () => {
    console.log('Server corriendo en localhost:8080...'.green.bold);
  })
  .on('error', err => {
      mongoose.disconnect();
      console.log(err);
  });
});