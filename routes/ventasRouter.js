var express = require('express');
var router = express.Router();
const ventasController = require('../controllers/ventas_C');
const clientesController = require('../controllers/clientes_C')

/* GET users listing. */
router.get('/', function (req, res, next) {
  ventasController.todo()
    .then((ventas) => {
      return clientesController.todo()
        .then((clientes) => {
          res.locals.mensaje = null
          res.locals.status = ventas.status
          res.render('ventas',
            {
              data: ventas.data,
              clientes: clientes.data,
              entradas: ventas.entradas,
              productos: ventas.productos,
              titulo: 'Ventas'
            }
          );
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/uno/:id', function (req, res, next) {
  ventasController.uno(req.params.id)
    .then((ventas) => {
      res.locals.mensaje = ventas.mensaje
      res.locals.status = ventas.status
      res.render('ventas',
        {
          data: ventas.data,
          titulo: 'Ventas'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/busqueda', function (req, res, next) {
  ventasController.busqueda(req.body)
    .then((ventas) => {
      res.locals.mensaje = ventas.mensaje
      res.locals.status = ventas.status
      res.render('ventas',
        {
          data: ventas.data,
          titulo: 'Ventas'
        }
      )
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/crear', function (req, res, next) {
  ventasController.crear(req.body)
    .then((crear) => {
      return clientesController.todo()
        .then((clientes) => {
          return ventasController.todo()
            .then((ventas) => {
              res.locals.mensaje = crear.mensaje
              res.locals.status = ventas.status
              res.render('ventas',
                {
                  data: ventas.data,
                  clientes: clientes.data,
                  entradas: ventas.entradas,
                  productos: ventas.productos,
                  titulo: 'Ventas'
                }
              );
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });

});

router.put('/modificar/:id', function (req, res, next) {
  ventasController.editar(req.params.id, req.body)
    .then((editar) => {
      return ventasController.todo()
        .then((todo) => {
          res.locals.mensaje = editar.mensaje
          res.locals.status = editar.status
          res.render('ventas',
            {
              data: todo.data,
              titulo: 'Ventas'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/eliminar/:id', function (req, res, next) {
  ventasController.eliminar(req.params.id)
    .then((eliminar) => {
      return ventasController.todo()
        .then((todo) => {
          res.locals.mensaje = eliminar.mensaje
          res.locals.status = eliminar.status
          res.render('ventas',
            {
              data: todo.data,
              titulo: 'Ventas'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
