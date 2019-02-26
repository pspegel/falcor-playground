import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';

import webpackConfig from '../webpack.dev.config';

const app = express();
const port = 5000;

if (app.get('env') === 'development') {
  // Compile the client app in memory instead of explicitly running webpack which writes the client bundle to /dist.
  // Changes in the client are compiled automatically but the browser wont reload or HMR.
  const compiler = webpack([webpackConfig as any]);
  app.use(
    devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  // Replace modules live in the browser.
  app.use(hotMiddleware(compiler));
}

app.use(
  '/model.json',
  falcorExpress.dataSourceRoute(
    (req, res) =>
      new Router([
        {
          route: 'greeting',
          get: () => ({ path: ['greeting'], value: 'Hello world' })
        }
      ])
  )
);

app.get('/api', (req, res) => res.send('Up and running'));

// Allow Express to serve static content like script files. Without it the React app would not be accessible and the
// <script> tag in the HTML template would be worthless.
app.use(express.static(__dirname));

app.listen(port, () => console.log(`Server running at port ${port}`));
