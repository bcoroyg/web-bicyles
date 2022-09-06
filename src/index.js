import logger from 'morgan';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';
import fileUpload from 'express-fileupload';
import sessionMongoDB from 'connect-mongodb-session';
import assert from 'assert';
import config from './config/index.js';
import routerAPP from './routes/index.js';
import notFoundHandler from './utils/middlewares/notFoundHandler.js';
import { errorHandler, logErrors } from './utils/middlewares/errorHandler.js';
import connectionDB from './lib/mongoose.js';
import passport from './utils/auth/index.js';
//New Relic
if(process.env.NODE_ENV === 'production'){
  (await import('newrelic'));
};
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const MongoDBStore = sessionMongoDB(session);

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
//Fileupload - Carga de archivos
app.use(fileUpload());
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

app.use(
  session({
    secret: config.secretSession,
    key: config.keySession,
    resave: false,
    saveUninitialized: false,
    store,
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
