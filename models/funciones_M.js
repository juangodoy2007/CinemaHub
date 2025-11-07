const db = require('../database/db')
const { v4: uuidv4 } = require('uuid');
const { empty, incompletos } = require('../utils/validaciones')

class funcionesModel {
  todo() {
    return new Promise(async (resolve, reject) => {
      let funciones = [];
      let peliculas = [];
      let salas = [];

      try {
        funciones = await new Promise((resolve, reject) => {
          const sql = 'SELECT f.id_funcion, f.id_pelicula, f.id_sala, f.asientos AS asientos_dis, f.asientos_total AS asientos_existentes, f.hora, f.precio, p.titulo, p.sinopsis, p.duracion_minutos AS duracion, p.genero, p.clasificacion, p.cartelera, s.numero_sala AS sala, s.tipo_sala FROM funciones f INNER JOIN peliculas p ON p.id_pelicula = f.id_pelicula INNER JOIN salas s ON s.id_sala = f.id_sala WHERE f.activa = ?'
          db.query(sql, [1], function (error, results, fields) {
            if (error) return reject({ status: 400, mensaje: error });
            if (results.length === 0) {
              return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
            }
            return resolve(results)
          });
        })

        peliculas = await new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM peliculas WHERE activa = ?'
          db.query(sql, [1], function (error, results, fields) {
            if (error) return reject({ status: 400, mensaje: error });
            if (results.length === 0) {
              return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
            }
            return resolve(results)
          });
        })

        salas = await new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM salas WHERE activa = ?'
          db.query(sql, [1], function (error, results, fields) {
            if (error) return reject({ status: 400, mensaje: error });
            if (results.length === 0) {
              return resolve({ status: 200, mensaje: 'Sin datos para mostrar', data: results })
            }
            return resolve(results)
          });
        })
      } catch (error) {
        reject(error)
      } finally {
        resolve({ status: 200, mensaje: 'Consulta exitosa', data: funciones, peliculas: peliculas, salas: salas })
      }


    })
  }

  uno(id) {
    return new Promise(async (resolve, reject) => {
      const sql = 'SELECT f.id_funcion, f.id_pelicula, f.id_sala, f.asientos AS asientos_dis, f.asientos_total AS asientos_existentes, f.hora, f.precio, p.titulo, p.sinopsis, p.duracion_minutos AS duracion, p.genero, p.clasificacion, p.cartelera, s.numero_sala AS sala, s.tipo_sala FROM funciones f INNER JOIN peliculas p ON p.id_pelicula = f.id_pelicula INNER JOIN salas s ON s.id_sala = f.id_sala WHERE f.id_funcion = ? AND f.activa = ?'
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
      const sql = 'SELECT f.id_funcion, f.id_pelicula, f.id_sala, f.asientos AS asientos_dis, f.asientos_total AS asientos_existentes, f.hora, f.precio, p.titulo, p.sinopsis, p.duracion_minutos AS duracion, p.genero, p.clasificacion, p.cartelera, s.numero_sala AS sala, s.tipo_sala FROM funciones f INNER JOIN peliculas p ON p.id_pelicula = f.id_pelicula INNER JOIN salas s ON s.id_sala = f.id_sala WHERE p.titulo LIKE ? AND f.activa = ?'
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
      const { id_pelicula, id_sala, hora, precio } = data
      const vacio = empty(data);
      if (!vacio) {
        return resolve({ status: 400, mensaje: 'No se han proporcionado datos' });
      }

      const verificar = await new Promise((resolve, reject) => {
        const slq = 'SELECT * FROM funciones WHERE id_pelicula = ? AND id_sala = ? AND activa = ?'
        db.query(slq, [id_pelicula, id_sala, 1], function (error, results, fields) {
          if (error) return reject({ status: 400, mensaje: error });
          resolve(results)
        });
      })

      if (verificar.length > 0) {
        return resolve({ status: 400, mensaje: 'Funcion ya existe' })
      }

      db.beginTransaction(async function (err) {
        if (err) return reject(err);
        try {
          const asientos = await new Promise((resolve, reject) => {
            const sqlAsientos = 'SELECT asientos FROM salas WHERE id_sala = ? and activa = ?'
            db.query(sqlAsientos, [id_sala, 1], function (error, results, fields) {
              if (error) return reject({ status: 400, mensaje: error });
              resolve(results)
            });
          })

          if (asientos.length === 0) {
            return resolve({ status: 400, mensaje: 'La sala no existe o no está activa' })
          }

          const info = [uuidv4(), id_pelicula, id_sala, asientos[0].asientos, asientos[0].asientos, hora, precio, 1]

          await new Promise((resolve, reject) => {
            const sql = 'INSERT INTO funciones (id_funcion, id_pelicula, id_sala, asientos, asientos_total, hora, precio, activa) VALUES (?,?,?,?,?,?,?,?)'
            db.query(sql, info, function (error, results, fields) {
              if (error) return reject({ status: 400, mensaje: error });
              resolve(results)
            });
          })

          const entrada = [uuidv4(), precio, info[0], 1]
          await new Promise((resolve, reject) => {
            const sql = 'INSERT INTO entradas (id_entrada, precio, id_funcion, activa) VALUES (?,?,?,?)'
            db.query(sql, entrada, function (error, results, fields) {
              if (error) return reject({ status: 400, mensaje: error });
              resolve()
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

  editar(id, data) {
    return new Promise(async (resolve, reject) => {
      const { id_pelicula, id_sala, hora, precio } = data
      const info = [id_pelicula, id_sala, hora, precio, id]
      const vendidos = await new Promise((resolve, reject) => {
        const sql = 'SELECT asientos, asientos_total FROM funciones WHERE id_funcion = ? AND activa = ?'
        db.query(sql, [id, 1], function (error, results, fields) {
          if (error) return reject({ status: 400, mensaje: error });
          resolve(results[0])
        });
      })

      if (vendidos.asientos != vendidos.asientos_total) {
        return resolve({ status: 404, mensaje: 'No puedes modificar una funcion con ventas registradas' })
      }

      const sql = `UPDATE funciones SET id_pelicula = ?, id_sala = ?, hora = ?, precio = ? WHERE id_funcion = ?`
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
      const sql = 'UPDATE funciones SET activa = ? WHERE id_funcion = ?'
      db.query(sql, [0, id], function (error, results, fields) {
        if (error) return reject({ status: 400, mensaje: error });
        resolve({ status: 200, mensaje: 'Eliminado con éxito' })
      });
    })
  }


}

module.exports = new funcionesModel();