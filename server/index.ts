import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import falcorExpress from 'falcor-express';
import Router from 'falcor-router';

import webpackConfig from '../webpack.dev.config';
import db from './db';
import { ModelName } from './constants';
import Recipe, { RecipeProperties } from './models/Recipe';

/*tslint:disable:no-console*/

const app = express();
const port = 5000;

if (app.get('env') === 'development') {
  console.log('HMR enabled');

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
          route: `${ModelName.recipe}["length"]`,
          get: () =>
            db.then(async () => {
              const value = await Recipe.estimatedDocumentCount();
              return { path: [ModelName.recipe, 'length'], value };
            })
        },
        {
          route: `${ModelName.recipe}[{integers}].title`,
          get: () =>
            db.then(async () => {
              const recipies = await Recipe.find({}, { title: 1 });
              return recipies.map((recipe: RecipeProperties, index) => ({
                path: [ModelName.recipe, index, 'title'],
                value: recipe.title
              }));
            })
        }
      ])
  )
);

app.get('/api', (req, res) => {
  res.send('Up and running');
});

// Allow Express to serve static content like script files. Without it the React app would not be accessible and the
// <script> tag in the HTML template would be worthless.
app.use(express.static(__dirname));

app.listen(port, () => console.log(`Server running at port ${port}`));
