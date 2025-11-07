const movieModel = require('../models/movie_M')

class movieController {
  todo(){
    return new Promise(async(resolve, reject) => {
      movieModel.todo()
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }
  
  uno(id){
    return new Promise(async(resolve, reject) => {
      movieModel.uno(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  busqueda(titulo){
    return new Promise(async(resolve, reject) => {
      movieModel.busqueda(titulo)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  crear(data, imagen){
    return new Promise(async(resolve, reject) => {
      movieModel.crear(data, imagen)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  editar(id, data, imagen){
    return new Promise(async(resolve, reject) => {
      movieModel.editar(id, data, imagen)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  eliminar(id){
    return new Promise(async(resolve, reject) => {
      movieModel.eliminar(id)
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        reject(err)
      });  
    })
  }

  
}

module.exports = new movieController();