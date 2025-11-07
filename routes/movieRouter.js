var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movie_C');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.mimetype.replace('/', '.'))
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function (req, res, next) {
  movieController.todo()
    .then((movies) => {
      res.locals.mensaje = movies.mensaje
      res.locals.status = movies.status
      res.render('peliculas',
        {
          data: movies.data,
          titulo: 'Películas'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/uno/:id', function (req, res, next) {
  movieController.uno(req.params.id)
    .then((movies) => {
      res.locals.mensaje = movies.mensaje
      res.locals.status = movies.status
      res.render('peliculas',
        {
          data: movies.data,
          titulo: 'Películas'
        }
      );
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/busqueda', function (req, res, next) {
  movieController.busqueda(req.body)
    .then((movies) => {
      res.locals.mensaje = movies.mensaje
      res.locals.status = movies.status
      res.render('peliculas',
        {
          data: movies.data,
          titulo: 'Películas'
        }
      )
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/crear', upload.single('cartelera'), function (req, res, next) {
  movieController.crear(req.body, req.file)
    .then((crear) => {
      return movieController.todo()
        .then((todo) => {
          res.locals.mensaje = crear.mensaje
          res.locals.status = crear.status
          res.render('peliculas',
            {
              data: todo.data,
              titulo: 'Películas'
            }
          );
        });
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.put('/modificar/:id', upload.single('cartelera'), function (req, res, next) {
  movieController.editar(req.params.id, req.body, req.file ? req.file : null)
    .then((editar) => {
      return movieController.todo()
        .then((todo) => {
          res.locals.mensaje = editar.mensaje
          res.locals.status = editar.status
          res.render('peliculas',
            {
              data: todo.data,
              titulo: 'Películas'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/eliminar/:id', function (req, res, next) {
  movieController.eliminar(req.params.id)
    .then((eliminar) => {
      return movieController.todo()
        .then((todo) => {
          res.locals.mensaje = eliminar.mensaje
          res.locals.status = eliminar.status
          res.render('peliculas',
            {
              data: todo.data,
              titulo: 'Películas'
            })
        })
    }).catch((err) => {
      res.status(500).json(err);
    });
});



module.exports = router;
