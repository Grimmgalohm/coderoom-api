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
app.use(express.static('public'));

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

//crea un nuevo usuario/ req password y nombre
app.post('/api/users', function(req, res){
  if(!req.body.password || !req.body.nombre){
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
    }).then(function(user){
      res.status(201).json(user);
    })
  })
}
});

//modifica nombre de usuario y contraseña/pending
/*
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
*/

//modifica nombre de usuario y contraseña/pending
app.put('/api/users/:id', function(req, res){

  directorio.findOne({_id:req.params.id}).then(user =>{
  if(!req.params.id){
    res.status(404).send('Not Found')
  }else{
  let hashPromise;

  if(req.body.password){
    hashPromise = bcrypt.hash(req.body.password, 8);
  }else{
    hashPromise = Promise.resolve();
  }

  hashPromise.then(hashed => {
    const fields = ['password', 'nombre'];
    let updateObject = {};
    fields.forEach(field => {
      if(req.body[field]){
        updateObject[field] = req.body[field];
      }
    });
    if(hashed) updateObject.password = hashed;
    return directorio.findOneAndUpdate({ _id: req.params.id }, updateObject, {new: true, upsert: true});
  })
  .then(user => {
    res.status(200).json(user);
     })
    }
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
      console.log(err, 'You fucked something...'.bgRed.bold);
  }
  app.listen(8080, () => {
    console.log(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'.bold,'\n[|]'.bold,'                       ', '[|]'.bold,'\n[|]'.bold,'    STATUS:'.blue.bold, '    ON'.green.bold, '     [|]'.bold,'\n[|]'.bold,'                       ', '[|]'.bold,'\n[|]'.bold,'    PORT:'.blue.bold, '      8080'.red.bold, '   [|]'.bold,'\n[|]'.bold,'                       ', '[|]'.bold,'\n[|]'.bold,'     READY TO WORK     '.green.bold, '[|]'.bold,'\n[|]'.bold,'                       ', '[|]'.bold,'\n[|]'.bold,'_______________________', '[|]'.bold);
  })
  .on('error', err => {
      mongoose.disconnect();
      console.log(err, 'You fucked something...'.bgRed.bold);
  });
});