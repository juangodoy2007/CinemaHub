var express = require('express');
var router = express.Router();
const funcionesController = require('../controllers/funciones_C');

/* GET users listing. */
router.get('/', function (req, res, next) {
  funcionesController.todo()
    .then((funciones) => {
      res.locals.mensaje = funciones.mensaje
      res.locals.status = funciones.status
      res.render('funciones',
        {
          data: funciones.data,
          peliculas: funciones.peliculas,
          salas: funciones.salas,
          titulo: 'Funciones'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/uno/:id', function (req, res, next) {
  funcionesController.uno(req.params.id)
    .then((funciones) => {
      res.locals.mensaje = funciones.mensaje
      res.locals.status = funciones.status
      res.render('funciones',
        {
          data: funciones.data,
          peliculas: funciones.peliculas,
          salas: funciones.salas,
          titulo: 'Funciones'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/busqueda', function (req, res, next) {
  funcionesController.busqueda(req.body)
    .then((funciones) => {
      return funcionesController.todo()
        .then((todo) => {
          res.locals.mensaje = funciones.mensaje
          res.locals.status = funciones.status
          res.render('funciones',
            {
              data: funciones.data,
              peliculas: todo.peliculas,
              salas: todo.salas,
              titulo: 'Funciones'
            }
          )
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/crear', function (req, res, next) {
  funcionesController.crear(req.body)
    .then((crear) => {
      return funcionesController.todo()
        .then((todo) => {
          res.locals.mensaje = crear.mensaje
          res.locals.status = crear.status
          res.render('funciones',
            {
              data: todo.data,
              peliculas: todo.peliculas,
              salas: todo.salas,
              titulo: 'Funciones'
            }
          );
        });
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/modificar/:id', function (req, res, next) {
  funcionesController.editar(req.params.id, req.body)
    .then((editar) => {
      return funcionesController.todo()
        .then((todo) => {
          res.locals.mensaje = editar.mensaje
          res.locals.status = editar.status
          res.render('funciones',
            {
              data: todo.data,
              peliculas: todo.peliculas,
              salas: todo.salas,
              titulo: 'Funciones'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/eliminar/:id', function (req, res, next) {
  funcionesController.eliminar(req.params.id)
    .then((eliminar) => {
      return funcionesController.todo()
        .then((todo) => {
          res.locals.mensaje = eliminar.mensaje
          res.locals.status = eliminar.status
          res.render('funciones',
            {
              data: todo.data,
              peliculas: todo.peliculas,
              salas: todo.salas,
              titulo: 'Funciones'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
