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
      db
        .then(async () => {
          const value = await Recipe.estimatedDocumentCount();
          return { path: [DbModelName.Recipe, 'length'], value };
        })
        .catch(() => {
          throw new Error('DB fail');
        })
  },
  {
    route: getRecipe,
    get: async (pathSet: any) => {
      const keys: string[] = pathSet[2];

      return db
        .then(async () => {
          const recipes = await Recipe.find({}, toProjection(keys));
          return _.flatMap(recipes, (recipe: RecipeProperties, index) =>
            keys.map((key) => ({
              path: [DbModelName.Recipe, index, key],
              value: atomize(recipe[key])
            }))
          );
        })
        .catch(() => {
          throw new Error('DB fail');
        });
    }
  }
];

export default routes;
