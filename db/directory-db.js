const mongoose = require('mongoose');

const DirectorySchema = mongoose.Schema({
  nombre: {type: String, required: true},
  apellido1: {type: String},
  apellido2: {type: String},
  email: {type: String},
  password: {type: String, required: true},
  celphone: {type: String},
  home: {type: String},
  work: {type: String},
  emergency: {type: String},  
  created: {type: Date, default: Date.now}
});

const directorio = mongoose.model('directorio', DirectorySchema);

module.exports = directorio;