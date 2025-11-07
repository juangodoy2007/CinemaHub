var express = require('express');
var router = express.Router();
const peliculasController = require('../controllers/peliculas_c')

router.get('/', function (req, res, next) {
  peliculasController.todos()
    .then((result) => {
      // res.render('peliculasView', {
      //   title: 'Peliculas',
      //   status: result.status,
      //   data: result.data || [],
      //   mensaje: result.mensaje,
      // })
      res.status(result.status).json({
        status: result.status,
        data: result.data || [],
        mensaje: result.mensaje
      })
    }).catch((err) => {
      res.status(err.status).json({
        status: err.status,
        mensaje: 'Tenemos un error',
        error: err.error
      })
    });
});

router.post('/uno/:id', function (req, res, next) {
  peliculasController.uno(req.params.id)
    .then((result) => {
      res.status(result.status).json({
        status: result.status,
        data: result.data || [],
        mensaje: result.mensaje
      })
    }).catch((err) => {
      res.status(err.status).json({
        status: err.status,
        mensaje: 'Tenemos un error',
        error: err.error
      })
    });
});

router.post('/crear', function (req, res, next) {
  peliculasController.agregar(req.body)
    .then((result) => {
      res.status(result.status).json({
        status: result.status,
        data: result.data || [],
        mensaje: result.mensaje
      })
    }).catch((err) => {
      res.status(err.status).json({
        status: err.status,
        mensaje: 'Tenemos un error',
        error: err.error
      })
    });
});

router.delete('/eliminar/:id', function (req, res, next) {
  peliculasController.eliminar(req.params.id)
    .then((result) => {
      res.status(result.status).json({
        status: result.status,
        data: result.data || [],
        mensaje: result.mensaje
      })
    }).catch((err) => {
      res.status(err.status).json({
        status: err.status,
        mensaje: 'Tenemos un error',
        error: err.error
      })
    });
});

router.put('/editar/:id', function (req, res, next) {
  peliculasController.modificar(req.params.id, req.body)
    .then((result) => {
      res.status(result.status).json({
        status: result.status,
        data: result.data || [],
        mensaje: result.mensaje
      })
    }).catch((err) => {
      res.status(err.status).json({
        status: err.status,
        mensaje: 'Tenemos un error',
        error: err.error
      })
    });
});

module.exports = router;
