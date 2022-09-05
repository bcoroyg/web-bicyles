import logger from 'morgan';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';
import config from './config/index.js';
import routerAPP from './routes/index.js';
import notFoundHandler from './utils/middlewares/notFoundHandler.js';
import { errorHandler, logErrors } from './utils/middlewares/errorHandler.js';
import connectionDB from './lib/mongoose.js';
import passport from './utils/auth/index.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();

// Numero de Puerto
app.set('port', config.port);
//Motor de plantilla
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(logger('dev'));
//Body-parser (json)
app.use(express.json());
// Habilita la entrada de datos de formulario
app.use(express.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(
  session({
    secret: config.secretSession,
    key: config.keySession,
    resave: false,
    saveUninitialized: false,
  })
);
//flash messages
app.use(flash());
//Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear();
  //path
  res.locals.path = req.path;
  //messages
  res.locals.messages = req.flash();
  //User
  res.locals.user = req.user || {};
  next();
});

//Routes
routerAPP(app);

//Error 404
app.use(notFoundHandler);
//Middlewares de Errores
app.use(logErrors);
app.use(errorHandler);


//Server
app.listen(app.get('port'), async () => {
  console.log(`Server started on port`);
  await connectionDB();
});
