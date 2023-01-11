import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const uploadHandler = ({ file, collection }) => {
  return new Promise((resolve, reject) => {
    // Cambiar nombre al archivo del 1000 a 9999
    const name = Math.floor(Math.random() * (9999 - 1000) + 1000);
    //capturar la extension del archivo
    const ext = file.name.split('.').pop();
    //Si no existe la carpeta
    // Crear la nueva carpeta con el nombre de la URL si aun no existe
    if (!fs.existsSync(`./src/public/uploads/${collection}`)) {
      fs.mkdirSync(`./src/public/uploads/${collection}`);
    }
    // ########## PATH ########
    const path = `./src/public/uploads/${collection}`;

    const nameFile = `${name}.${ext}`;
    // Moviendo archivo a la carpeta img
    file.mv(`${path}/${nameFile}`, (error) => {
      if (error) {
        reject(new Error(error));
      }
      resolve(nameFile);
    });
  });
};
export const deleteFile = ({ nameFile, collection }) => {
  const pathUrl = path.join(
    __dirname,
    '../public/uploads',
    collection,
    nameFile
  );
  if (fs.existsSync(pathUrl)) {
    // eliminar archivo con filesystem
    fs.unlink(pathUrl, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
};
