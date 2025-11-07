const db = require('../database/db')
const { v4: uuidv4 } = require('uuid');
const { empty, incompletos } = require('../utils/validaciones')

class movieModel {
  todo() {
    return new Promise(async (resolve, reject) => {
      const sql = 'SELECT * FROM peliculas WHERE activa = ?'
      db.query(sql, [1], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        if (results.length === 0) {
          return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
        }
        return resolve({ status: 200, mensaje: 'Consulta exitosa', data: results })
      });
    })
  }

  uno(id) {
    return new Promise(async (resolve, reject) => {
      const sql = 'SELECT * FROM peliculas WHERE id_pelicula = ? AND activa = ?'
      db.query(sql, [id, 1], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        if (results.length === 0) {
          return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
        }
        return resolve({ status: 200, mensaje: 'Consulta exitosa', data: results })
      });
    })
  }

  busqueda(titulo) {
    return new Promise(async (resolve, reject) => {
      const data = titulo.titulo_bu + '%'
      const sql = 'SELECT * FROM peliculas WHERE titulo LIKE ? AND activa = ?'

      const vacio = empty(titulo);
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos para buscar' });
      }

      db.query(sql, [data, 1], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        if (results.length === 0) {
          return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
        }
        return resolve({ status: 200, mensaje: 'Consulta exitosa', data: results })
      });
    })
  }

  crear(data, imagen) {
    return new Promise(async (resolve, reject) => {
      const { titulo, sinopsis, duracion_minutos, genero, clasificacion, fecha_estreno } = data
      const info = [uuidv4(), titulo, sinopsis, duracion_minutos, genero, clasificacion, fecha_estreno, imagen.filename, 1]
      const sql = 'INSERT INTO peliculas (id_pelicula, titulo, sinopsis, duracion_minutos, genero, clasificacion, fecha_estreno, cartelera, activa) VALUES (?,?,?,?,?,?,?,?,?)'
      const vacio = empty(data);
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos' });
      }
      if (!imagen) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado una imagen' });
      }
      db.query(sql, info, function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Creado con éxito' })
      });
    })
  }

  editar(id, data, imagen) {
    return new Promise(async (resolve, reject) => {
      const { titulo, sinopsis, duracion_minutos, genero, clasificacion, fecha_estreno } = data
      let cambioImagen = ''
      let info = []
      if (imagen) {
        cambioImagen = ', cartelera = ?'
        info = [titulo, sinopsis, duracion_minutos, genero, clasificacion, fecha_estreno, imagen.filename, id]
      } else {
        info = [titulo, sinopsis, duracion_minutos, genero, clasificacion, fecha_estreno, id]
      }
      const sql = `UPDATE peliculas SET titulo = ?, sinopsis = ?, duracion_minutos = ?, genero = ?, clasificacion = ?, fecha_estreno = ? ${cambioImagen} WHERE id_pelicula = ?`
      const vacio = empty(data);
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos' });
      }
      
      db.query(sql, info, function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Modificado con éxito' })
      });
    })
  }

  eliminar(id) {
    return new Promise(async (resolve, reject) => {
      const sql = 'UPDATE peliculas SET activa = ? WHERE id_pelicula = ?'
      db.query(sql, [0, id], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Eliminado con éxito' })
      });
    })
  }


}

module.exports = new movieModel();