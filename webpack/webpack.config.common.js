import path from 'path';
import merge from 'webpack-merge';
import { lintJavascript } from './webpack.parts';

const paths = {
  server: path.join(__dirname, 'src'),
  client: path.join(__dirname, 'client'),
};

const config = merge([
  lintJavascript({
    include: [
      paths.server,
      paths.client,
    ],
  }),
]);

const commonConfig = merge({}, config);
export default commonConfig;
