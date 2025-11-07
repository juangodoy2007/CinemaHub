const peliculasModels = require('../models/peliculas_m')

class peliculasController {
  todos() {
    return new Promise((resolve, reject) => {
      peliculasModels.todos()
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        });
    })
  }
  uno(pelicula) {
    return new Promise((resolve, reject) => {
      peliculasModels.uno(pelicula)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        });
    })
  }

  agregar(pelicula) {
    return new Promise((resolve, reject) => {
      peliculasModels.agregar(pelicula)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        });
    })
  }

  eliminar(pelicula) {
    return new Promise((resolve, reject) => {
      peliculasModels.eliminar(pelicula)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        });
    })
  }

  modificar(id, pelicula) {
    return new Promise((resolve, reject) => {
      peliculasModels.modificar(id, pelicula)
        .then((result) => {
          resolve(result)
        }).catch((err) => {
          reject(err)
        });
    })
  }
}

module.exports = new peliculasController();