import express from 'express';
import logger from 'morgan';
import flash from 'connect-flash';
import path from 'path';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import sessionMongoDB from 'connect-mongodb-session';
import { fileURLToPath } from 'url';
import assert from 'assert';

import passport from '../utils/auth/index.js';
import config from '../config/index.js';
import routerAPP from '../routes/index.js';
import {
  errorHandler,
  logErrors,
  notFoundHandler,
} from '../utils/middlewares/index.js';
import connectionDB from '../lib/mongoose.js';

//New Relic
if (process.env.NODE_ENV === 'production') {
  (await import('newrelic')).default;
}

const _app = express();
const _port = config.port;
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const MongoDBStore = sessionMongoDB(session);

export class Server {
  constructor() {
    this._app = _app;
    this._port = _port;

    //database
    this.dbConnect();

    //configurationValues
    this.configurationValues();

    //middlewares
    this.middlewares();

    //routes
    this.routes();

    //middlewares error
    this.errors();

    //listen
    //Activar solo en desarrollo
    config.dev ? this.listen() : null;
  }

  configurationValues() {
    // Numero de Puerto
    this._app.set('port', config.port);
    //Motor de plantilla
    this._app.set('view engine', 'pug');
    this._app.set('views', path.join(__dirname, '..', 'views'));
  }

  async dbConnect() {
    await connectionDB();
  }

  routes() {
    routerAPP(this._app);
  }

  middlewares() {
    //Middlewares
    this._app.use(logger('dev'));
    //Body-parser (json)
    this._app.use(express.json());
    // Habilita la entrada de datos de formulario
    this._app.use(express.urlencoded({ extended: false }));
    // static files
    this._app.use(express.static(path.join(__dirname, '..', 'public')));
    //Fileupload - Carga de archivos
    this._app.use(fileUpload());

    //Session
    let store;
    if (config.dev) {
      store = new session.MemoryStore();
    } else {
      const DB_USER = encodeURIComponent(config.dbUser);
      const DB_PASSWORD = encodeURIComponent(config.dbPassword);
      store = new MongoDBStore({
        uri: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`,
        collection: 'sessions',
      });
      store.on('error', function (error) {
        console.log(error);
        assert.ifError(error);
        assert.ok(false);
      });
    }
    this._app.use(
      session({
        secret: config.secretSession,
        key: config.keySession,
        resave: false,
        saveUninitialized: false,
        store: store,
      })
    );
    // End session

    //flash messages
    this._app.use(flash());
    //Inicializar passport
    this._app.use(passport.initialize());
    this._app.use(passport.session());

    //Variables globales
    this._app.use((req, res, next) => {
      //year
      res.locals.year = new Date().getFullYear();
      //flash messages
      res.locals.messages = req.flash();
      // user locals
      res.locals.user = req.user || {};
      //path
      res.locals.path = req.path;
      next();
    });
  }

  errors() {
    //Error 404
    this._app.use(notFoundHandler);
    //Middlewares de Errores
    this._app.use(logErrors);
    this._app.use(errorHandler);
  }

  listen() {
    this._app.listen(this._app.get('port'), () => {
      console.log(`Server started on port`);
    });
  }

  get app() {
    return this._app;
  }
}
