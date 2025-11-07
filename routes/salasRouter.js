var express = require('express');
var router = express.Router();
const salasController = require('../controllers/salas_C');

/* GET users listing. */
router.get('/', function (req, res, next) {
  salasController.todo()
    .then((salas) => {
      res.locals.mensaje = salas.mensaje
      res.locals.status = salas.status
      res.render('salas',
        {
          data: salas.data,
          titulo:'Salas'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/uno/:id', function (req, res, next) {
  salasController.uno(req.params.id)
    .then((salas) => {
      res.locals.mensaje = salas.mensaje
      res.locals.status = salas.status
      res.render('salas',
        {
          data: salas.data,
          titulo:'Salas'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/busqueda', function (req, res, next) {
  salasController.busqueda(req.body)
    .then((salas) => {
      res.locals.mensaje = salas.mensaje
      res.locals.status = salas.status
      res.render('salas',
        {
          data: salas.data,
          titulo:'Salas'
        }
      )
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/crear', function (req, res, next) {
  salasController.crear(req.body)
    .then((crear) => {
      return salasController.todo()
        .then((todo) => {
          res.locals.mensaje = crear.mensaje
          res.locals.status = crear.status
          res.render('salas',
            {
              data: todo.data,
              titulo:'Salas'
            }
          );
        });
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/modificar/:id', function (req, res, next) {
  salasController.editar(req.params.id, req.body)
    .then((editar) => {
      return salasController.todo()
        .then((todo) => {
          res.locals.mensaje = editar.mensaje
          res.locals.status = editar.status
          res.render('salas',
            {
              data: todo.data,
              titulo:'Salas'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/eliminar/:id', function (req, res, next) {
  salasController.eliminar(req.params.id)
    .then((eliminar) => {
      return salasController.todo()
        .then((todo) => {
          res.locals.mensaje = eliminar.mensaje
          res.locals.status = eliminar.status
          res.render('salas',
            {
              data: todo.data,
              titulo:'Salas'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
