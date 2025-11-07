const db = require('../database/db')
const { v4: uuidv4 } = require('uuid');
const { empty, incompletos } = require('../utils/validaciones')

function mayuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

class ventasModel {
  todo() {
    return new Promise(async (resolve, reject) => {
      const ventas = await new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ventas'
        db.query(sql, function (error, results, fields) {
          if (error) return reject({ status: 400, mensaje: error });
          return resolve(results)
        });
      })
      const entradas = await new Promise((resolve, reject) => {
        const sql = 'SELECT e.id_entrada, e.precio, f.asientos, f.hora, p.titulo FROM entradas e INNER JOIN funciones f ON e.id_funcion = f.id_funcion INNER JOIN peliculas p ON f.id_pelicula = p.id_pelicula WHERE e.activa = ?'
        db.query(sql, [1], function (error, results, fields) {
          if (error) return reject({ status: 400, mensaje: error });
          return resolve(results)
        });
      })
      const productos = await new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM productos'
        db.query(sql, function (error, results, fields) {
          if (error) return reject({ status: 400, mensaje: error });
          return resolve(results)
        });
      })
      resolve({ status: 200, mensaje: "Datos consultados con exito", data: ventas, entradas: entradas, productos: productos })
    })
  }

  uno(id) {
    return new Promise(async (resolve, reject) => {
      const sql = 'SELECT * FROM ventas WHERE id_cliente = ? AND activa = ?'
      db.query(sql, [id, 1], function (error, results, fields) {
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
      const { id_cliente, metodo_pago, tipo, precio, cantidad, total_v, productos, entradas } = data
      const id_venta = uuidv4();
      const id_detalle = uuidv4();

      const id_entrada = JSON.parse(entradas)
      const vacio = empty(data);
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos' });
      }

      const infoVentas = [id_venta, id_detalle, id_cliente, total_v, metodo_pago, 1]
      const infoDet = [id_detalle, tipo, precio, cantidad, total_v, productos, id_entrada.id_entrada]

      db.beginTransaction(async function (err) {
        if (err) reject({ status: 400, mensaje: err })
        try {
          await new Promise((resolve, reject) => {
            const sql = 'INSERT INTO ventas (id_venta, id_det, id_cliente, total, metodo_pago, activa) VALUES (?,?,?,?,?,?)'
            db.query(sql, infoVentas, function (error, results, fields) {
              if (error) {
                return reject({ status: 400, mensaje: error });
              }
              resolve()
            });
          })

          await new Promise((resolve, reject) => {
            const sql = 'INSERT INTO detalle_venta (id_detalle, tipo, precio, cantidad, total, id_prod, id_entrada) VALUES (?,?,?,?,?,?,?)'
            db.query(sql, infoDet, function (error, results, fields) {
              if (error) {
                return reject({ status: 400, mensaje: error });
              }
              resolve()
            });
          })
          
          await new Promise((resolve, reject) => {
            if (tipo !== 'entradas') return resolve();

            // Obtener la función asociada a la entrada y bloquear la fila para la transacción
            const idFuncion = id_entrada.id_funcion;
            const sqlGet = 'SELECT asientos FROM funciones WHERE id_funcion = ? FOR UPDATE';
            db.query(sqlGet, [idFuncion], function (error, results) {
              if (error) return reject({ status: 400, mensaje: error });
              if (results.length === 0) return reject({ status: 404, mensaje: 'Función no encontrada' });

              const actuales = parseInt(results[0].asientos, 10);
              const aVender = parseInt(cantidad, 10);
              if (isNaN(aVender) || aVender <= 0) return reject({ status: 400, mensaje: 'Cantidad inválida' });
              if (aVender > actuales) return reject({ status: 400, mensaje: 'No hay suficientes asientos' });

              const nuevos = actuales - aVender;
              const sqlUpd = 'UPDATE funciones SET asientos = ? WHERE id_funcion = ?';
              db.query(sqlUpd, [nuevos, idFuncion], function (error2) {
                if (error2) return reject({ status: 400, mensaje: error2 });
                resolve();
              });
            });
          })

          resolve({ status: 200, mensaje: 'Creado con éxito' })

        } catch (error) {
          db.rollback(() => {
            reject(error);
          });
        } finally {
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                reject(err);
              });
            }
          });
        }
      });
    })
  }

  eliminar(id) {
    return new Promise(async (resolve, reject) => {
      const sql = 'UPDATE ventas SET activa = ? WHERE id_venta = ?'
      db.query(sql, [0, id], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Venta anulada' })
      });
    })
  }


}

module.exports = new ventasModel();