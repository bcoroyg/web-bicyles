import logger from 'morgan';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config/index.js';
import routerAPP from './routes/index.js';

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

//Routes
routerAPP(app);

//Server
app.listen(app.get('port'), () => {
  console.log(`Server started on port`);
});
