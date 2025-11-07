const db = require('../database/db')
const { v4: uuidv4 } = require('uuid');
const { empty, incompletos } = require('../utils/validaciones')

function mayuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class clientesModel {
  todo() {
    return new Promise(async (resolve, reject) => {
      const sql = 'SELECT * FROM clientes WHERE activa = ?'
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
      const sql = 'SELECT * FROM clientes WHERE id_cliente = ? AND activa = ?'
      db.query(sql, [id, 1], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        if (results.length === 0) {
          return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
        }
        return resolve({ status: 200, mensaje: 'Consulta exitosa', data: results })
      });
    })
  }

  busqueda(nombre) {
    return new Promise(async (resolve, reject) => {
      const data = nombre.nombre_bu + '%'
      const sql = 'SELECT * FROM clientes WHERE nombre LIKE ? AND activa = ?'

      const vacio = empty(nombre);
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
      const { nombre, apellido, tipo, cedula, telefono } = data
      const cedulaCompleta = tipo.toUpperCase() + '-' + cedula
      const info = [uuidv4(), mayuscula(nombre), mayuscula(apellido), cedulaCompleta, telefono, 1]
      const sql = 'INSERT INTO clientes (id_cliente, nombre, apellido, cedula, telefono, activa) VALUES (?,?,?,?,?,?)'
      const vacio = empty(data);
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos' });
      }
      db.query(sql, info, function (error, results, fields) {
        if (error) {
          if (error.errno == 1062) {
            return resolve({ status: 400, mensaje: 'La cédula ya se registro' });
          } else {
            return reject({ status: 400, mensaje: error });
          }
        }
        resolve({ status: 200, mensaje: 'Creado con éxito' })
      });
    })
  }

  editar(id, data) {
    return new Promise(async (resolve, reject) => {
      const { nombre, apellido, tipo, cedula, telefono } = data
      const cedulaCompleta = tipo.toUpperCase() + '-' + cedula

      let info = [mayuscula(nombre), mayuscula(apellido), cedulaCompleta, telefono, id]
      const sql = `UPDATE clientes SET nombre = ?, apellido = ?, cedula = ?, telefono = ? WHERE id_cliente = ?`
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
      const sql = 'UPDATE clientes SET activa = ? WHERE id_cliente = ?'
      db.query(sql, [0, id], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Eliminado con éxito' })
      });
    })
  }


}

module.exports = new clientesModel();