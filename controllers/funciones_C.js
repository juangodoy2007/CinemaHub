const funcionesModel = require('../models/funciones_M')

class funcionesController {
  todo(){
    return new Promise(async(resolve, reject) => {
      funcionesModel.todo()
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }
  
  uno(id){
    return new Promise(async(resolve, reject) => {
      funcionesModel.uno(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  busqueda(titulo){
    return new Promise(async(resolve, reject) => {
      funcionesModel.busqueda(titulo)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  crear(data){
    return new Promise(async(resolve, reject) => {
      funcionesModel.crear(data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  editar(id, data){
    return new Promise(async(resolve, reject) => {
      funcionesModel.editar(id, data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  eliminar(id){
    return new Promise(async(resolve, reject) => {
      funcionesModel.eliminar(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  
}

module.exports = new funcionesController();