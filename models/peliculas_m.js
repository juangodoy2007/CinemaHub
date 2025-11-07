const { v4: uuidv4 } = require('uuid');
const { empty, incompletos } = require('../utils/validaciones')
const peliculas = [
  {
    id_pelicula: 10,
    titulo: "El Secreto de la Cueva",
    duracion_minutos: 95,
    genero: "Aventura/Fantasía",
    clasificacion: "PG"
  },
  {
    id_pelicula: 11,
    titulo: "Corazones de Acero",
    duracion_minutos: 145,
    genero: "Acción/Guerra",
    clasificacion: "R"
  },
  {
    id_pelicula: 12,
    titulo: "Una Tarde Tranquila",
    duracion_minutos: 78,
    genero: "Comedia/Romance",
    clasificacion: "G"
  },
  {
    id_pelicula: 13,
    titulo: "Más Allá de la Galaxia",
    duracion_minutos: 172,
    genero: "Ciencia Ficción",
    clasificacion: "PG-13"
  },
  {
    id_pelicula: 14,
    titulo: "Silencio Roto",
    duracion_minutos: 110,
    genero: "Thriller/Misterio",
    clasificacion: "R"
  }
]

class peliculasModels {
  todos() {
    return new Promise((resolve, reject) => {
      if (peliculas.length > 0) {
        resolve({ status: 200, data: peliculas, mensaje: 'Datos solicitados con exito' })
      } else {
        resolve({ status: 200, data: peliculas, mensaje: 'No hay peliculas para mostrar' })
      }
    })
  }

  uno(pelicula) {
    return new Promise((resolve, reject) => {
      console.log(pelicula)
      const result = peliculas.filter((item) => item.id_pelicula == pelicula)
      if (result.length > 0) {
        resolve({ status: 200, data: result, mensaje: 'Película encontrada' })
      } else {
        resolve({ status: 200, data: result, mensaje: 'Película no encontrada' })
      }
    })
  }

  agregar(pelicula) {
    return new Promise((resolve, reject) => {

      const vacio = empty(pelicula)
      const item = [uuidv4(), pelicula.titulo, pelicula.duracion_minutos, pelicula.genero, pelicula.clasificacion]
      const fields = ['id_pelicula', 'titulo', 'duracion_minutos', 'genero', 'clasificacion']
      const valido = incompletos(item, fields)

      if (!valido) {
        reject({ status: 400, error: 'Datos incompletos' })
      }

      if (!vacio) {
        reject({ status: 400, error: 'No puedes enviar campos vacios' })
      }
      let obj = {
        id_pelicula: uuidv4(),
        titulo: pelicula.titulo,
        duracion_minutos: pelicula.duracion_minutos,
        genero: pelicula.genero,
        clasificacion: pelicula.clasificacion
      }
      peliculas.push(obj)
      resolve({ status: 201, data: peliculas, mensaje: 'Película creado con exito' })
    })
  }

  eliminar(pelicula) {
    return new Promise((resolve, reject) => {
      const found = peliculas.findIndex(item => item.id_pelicula == pelicula)
      if (found === -1) {
        reject({ status: 404, error: 'Película no encontrada' })
      }
      peliculas.splice(found, 1)
      resolve({ status: 200, mensaje: 'Película eliminada con exito' })
    })
  }

  modificar(id, pelicula) {
    return new Promise((resolve, reject) => {
      const vacio = empty(pelicula)
      const item = [id, pelicula.titulo, pelicula.duracion_minutos, pelicula.genero, pelicula.clasificacion]
      const fields = ['id_pelicula', 'titulo', 'duracion_minutos', 'genero', 'clasificacion']
      const valido = incompletos(item, fields)

      if (!valido) {
        reject({ status: 400, error: 'Datos incompletos' })
      }

      if (!vacio) {
        reject({ status: 400, error: 'No puedes enviar campos vacios' })
      }

      const found = peliculas.findIndex(item => item.id_pelicula == id)
      if (found === -1) {
        reject({ status: 404, error: 'Película no encontrada' })
      }
      const obj = {
        id_pelicula: id,
        titulo: pelicula.titulo,
        duracion_minutos: pelicula.duracion_minutos,
        genero: pelicula.genero,
        clasificacion: pelicula.clasificacion
      }

      peliculas.splice(found, 1, obj)
      resolve({ status: 200, mensaje: 'Película modificada con exito', result: peliculas })
    })
  }

}

module.exports = new peliculasModels();