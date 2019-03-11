import express from 'express';
import webpack from 'webpack';
import createDevMiddleware from 'webpack-dev-middleware';
import createHotMiddleware from 'webpack-hot-middleware';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';
import fs from 'fs';
import path from 'path';

import webpackConfig from '../webpack.dev.config';
import falcorRoutes from './falcorRoutes';

/*tslint:disable:no-console*/

const app = express();
const port = 5000;

let devMiddleware: ReturnType<typeof createDevMiddleware> = null;
let clientOutputPath: string;

if (app.get('env') === 'development') {
  console.log('HMR enabled');

  // Compile the client app in memory instead of explicitly running webpack which writes the client bundle to /dist.
  // Changes in the client are compiled automatically but the browser wont reload or HMR.
  const compiler = webpack([webpackConfig as any]);

  devMiddleware = createDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  });
  app.use(devMiddleware);

  // Replace modules live in the browser.
  app.use(createHotMiddleware(compiler));

  const serverCompilerOptions: any = compiler.compilers.find((options) => options.name === 'client');
  if (serverCompilerOptions) {
    clientOutputPath = serverCompilerOptions.outputPath;
  }
}
// TODO: Set output path for production

app.use('/model.json', falcorExpress.dataSourceRoute((req, res) => new Router(falcorRoutes)));

// Allow Express to serve static content like script files. Without it the React app would not be accessible and the
// <script> tag in the HTML template would be worthless.
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  const buildFileSystem = app.get('env') === 'development' ? devMiddleware.fileSystem : fs;
  buildFileSystem.readFile(path.join(clientOutputPath, 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
      return;
    }

    res.send(file.toString());
  });
});

app.listen(port, () => console.log(`Server running at port ${port}`));
