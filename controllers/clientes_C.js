const clientesModel = require('../models/clientes_M')

class clientesController {
  todo(){
    return new Promise(async(resolve, reject) => {
      clientesModel.todo()
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }
  
  uno(id){
    return new Promise(async(resolve, reject) => {
      clientesModel.uno(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  busqueda(nombre){
    return new Promise(async(resolve, reject) => {
      clientesModel.busqueda(nombre)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  crear(data){
    return new Promise(async(resolve, reject) => {
      clientesModel.crear(data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  editar(id, data){
    return new Promise(async(resolve, reject) => {
      clientesModel.editar(id, data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  eliminar(id){
    return new Promise(async(resolve, reject) => {
      clientesModel.eliminar(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  
}

module.exports = new clientesController();