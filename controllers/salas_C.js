const salasModel = require('../models/salas_M')

class salasController {
  todo(){
    return new Promise(async(resolve, reject) => {
      salasModel.todo()
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }
  
  uno(id){
    return new Promise(async(resolve, reject) => {
      salasModel.uno(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  busqueda(titulo){
    return new Promise(async(resolve, reject) => {
      salasModel.busqueda(titulo)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  crear(data){
    return new Promise(async(resolve, reject) => {
      salasModel.crear(data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  editar(id, data){
    return new Promise(async(resolve, reject) => {
      salasModel.editar(id, data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  eliminar(id){
    return new Promise(async(resolve, reject) => {
      salasModel.eliminar(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  
}

module.exports = new salasController();