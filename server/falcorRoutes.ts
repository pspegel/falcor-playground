import { RouteDefinition } from 'falcor-router';
import _ from 'lodash';

import { ModelName } from './constants';
import Recipe, { RecipeProperties, gettableRecipeProperties } from './models/Recipe';
import db from './db';
import { toProjection, toPathKeys, atomize } from './helpers';

const getRecipe = `${ModelName.recipe}[{integers}].${toPathKeys(gettableRecipeProperties)}`;

const routes: RouteDefinition[] = [
  {
    route: `${ModelName.recipe}["length"]`,
    get: () =>
      db.then(async () => {
        const value = await Recipe.estimatedDocumentCount();
        return { path: [ModelName.recipe, 'length'], value };
      })
  },
  {
    route: getRecipe,
    get: async (pathSet: any) => {
      const keys: string[] = pathSet[2];

      return db.then(async () => {
        const recipies = await Recipe.find({}, toProjection(keys));
        return _.flatMap(recipies, (recipe: RecipeProperties, index) =>
          keys.map((key) => ({
            path: [ModelName.recipe, index, key],
            value: atomize(recipe[key])
          }))
        );
      });
    }
  }
];

export default routes;
