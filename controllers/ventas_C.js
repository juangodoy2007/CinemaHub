const ventasModel = require('../models/ventas_M')

class ventasController {
  todo(){
    return new Promise(async(resolve, reject) => {
      ventasModel.todo()
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }
  
  uno(id){
    return new Promise(async(resolve, reject) => {
      ventasModel.uno(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  busqueda(nombre){
    return new Promise(async(resolve, reject) => {
      ventasModel.busqueda(nombre)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  crear(data){
    return new Promise(async(resolve, reject) => {
      ventasModel.crear(data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  editar(id, data){
    return new Promise(async(resolve, reject) => {
      ventasModel.editar(id, data)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  eliminar(id){
    return new Promise(async(resolve, reject) => {
      ventasModel.eliminar(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  
}

module.exports = new ventasController();