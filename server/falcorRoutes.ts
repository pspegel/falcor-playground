import { RouteDefinition } from 'falcor-router';
import _ from 'lodash';

import { DbModelName, PathKey } from './constants';
import Recipe, { RecipeProperties, gettableRecipeProperties } from './models/Recipe';
import db from './db';
import { toProjection, toPathKeys, atomize } from './helpers';

export const getRecipe = `${PathKey.Recipe}[{integers}].${toPathKeys(gettableRecipeProperties)}`;

const routes: RouteDefinition[] = [
  {
    route: `${PathKey.Recipe}.length`,
    get: () =>
      db.then(async () => {
        const value = await Recipe.estimatedDocumentCount();
        return { path: [DbModelName.Recipe, 'length'], value };
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
            path: [DbModelName.Recipe, index, key],
            value: atomize(recipe[key])
          }))
        );
      });
    }
  }
];

export default routes;
