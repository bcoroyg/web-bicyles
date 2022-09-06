import 'webpack';
import { join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export default {
  entry: './src/public/js/app.js',
  output: {
    filename: 'bundle.js',
    path: join(__dirname, './src/public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
};
