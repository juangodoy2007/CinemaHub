const db = require('../database/db')
const { v4: uuidv4 } = require('uuid');
const { empty, incompletos } = require('../utils/validaciones')

class salasModel {
  todo() {
    return new Promise(async (resolve, reject) => {
      const sql = 'SELECT * FROM salas WHERE activa = ?'
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
      const sql = 'SELECT * FROM salas WHERE id_pelicula = ? AND activa = ?'
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
      const data = titulo.titulo + '%'
      const sql = 'SELECT * FROM salas WHERE numero_sala LIKE ? AND activa = ?'

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

  crear(data) {
    return new Promise(async (resolve, reject) => {
      const { numero_sala, asientos, tipo_sala } = data
      const info = [uuidv4(), numero_sala, asientos, tipo_sala, 1]
      const sql = 'INSERT INTO salas (id_sala, numero_sala, asientos, tipo_sala, activa) VALUES (?,?,?,?,?)'
      const vacio = empty(data);
     
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos' });
      }
      db.query(sql, info, function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Creado con éxito' })
      });
    })
  }

  editar(id, data) {
    return new Promise(async (resolve, reject) => {
      const { numero_sala, asientos, tipo_sala } = data
      let info = [numero_sala, asientos, tipo_sala, id]
     
      const sql = `UPDATE salas SET numero_sala = ?, asientos = ?, tipo_sala = ? WHERE id_sala = ?`
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
      const sql = 'UPDATE salas SET activa = ? WHERE id_sala = ?'
      db.query(sql, [0, id], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Eliminado con éxito' })
      });
    })
  }


}

module.exports = new salasModel();