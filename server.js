import path from 'path';
import feathers, { static as serveStatic } from 'feathers';
import compress from 'compression';
import cors from 'cors';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import socketio from 'feathers-socketio';
import webpack from 'webpack';
import middleware from './server/middleware';
import services from './server/services';
import config from './webpack/webpack.config.development.babel';

const app = feathers();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.configure(configuration(path.join(__dirname, '..')));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use('/', serveStatic(app.get('public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

app.listen(process.env.PORT || 3000, 'localhost', (err) => {
  if (err) { return console.log(err); };
  console.log('Listening at http://localhost:3000');
});
