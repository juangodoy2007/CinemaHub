var express = require('express');
var router = express.Router();
const clientesController = require('../controllers/clientes_C');

/* GET users listing. */
router.get('/', function (req, res, next) {
  clientesController.todo()
    .then((clientes) => {
      res.locals.mensaje = clientes.mensaje
      res.locals.status = clientes.status
      res.render('clientes',
        {
          data: clientes.data,
          titulo: 'Clientes'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/uno/:id', function (req, res, next) {
  clientesController.uno(req.params.id)
    .then((clientes) => {
      res.locals.mensaje = clientes.mensaje
      res.locals.status = clientes.status
      res.render('clientes',
        {
          data: clientes.data,
          titulo: 'Clientes'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/busqueda', function (req, res, next) {
  clientesController.busqueda(req.body)
    .then((clientes) => {
      res.locals.mensaje = clientes.mensaje
      res.locals.status = clientes.status
      res.render('clientes',
        {
          data: clientes.data,
          titulo: 'Clientes'
        }
      )
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/crear', function (req, res, next) {
  clientesController.crear(req.body)
    .then((crear) => {
      return clientesController.todo()
        .then((todo) => {
          res.locals.mensaje = crear.mensaje
          res.locals.status = crear.status
          res.render('clientes',
            {
              data: todo.data,
              titulo: 'Clientes'
            }
          );
        });
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/modificar/:id', function (req, res, next) {
  clientesController.editar(req.params.id, req.body)
    .then((editar) => {
      return clientesController.todo()
        .then((todo) => {
          res.locals.mensaje = editar.mensaje
          res.locals.status = editar.status
          res.render('clientes',
            {
              data: todo.data,
              titulo: 'Clientes'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/eliminar/:id', function (req, res, next) {
  clientesController.eliminar(req.params.id)
    .then((eliminar) => {
      return clientesController.todo()
        .then((todo) => {
          res.locals.mensaje = eliminar.mensaje
          res.locals.status = eliminar.status
          res.render('clientes',
            {
              data: todo.data,
              titulo: 'Clientes'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
