import { RouteDefinition } from 'falcor-router';
import _ from 'lodash';
import mongoose from 'mongoose';

import { PathKey } from './constants';
import Recipe, { RecipeProperties, gettableRecipeProperties } from './models/Recipe';
import db from './db';
import { toProjection, atomize, pathBuilder, interpretPathSetWithIds } from './helpers';

export const getRecipe = pathBuilder(PathKey.Recipe)
  .withIndices()
  .withProperties(gettableRecipeProperties);
export const getRecipeById = pathBuilder(PathKey.RecipeById)
  .withIds()
  .withProperties(gettableRecipeProperties);

// TODO: Pretty print this in dev mode.
console.log({
  getRecipe,
  getRecipeById
});

const routes: RouteDefinition[] = [
  {
    route: `${PathKey.Recipe}.length`,
    get: () =>
      db
        .then(async () => {
          const value = await Recipe.estimatedDocumentCount();
          return { path: [PathKey.Recipe, 'length'], value };
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
              path: [PathKey.Recipe, index, key],
              value: atomize(recipe[key])
            }))
          );
        })
        .catch(() => {
          throw new Error('DB fail');
        });
    }
  },
  {
    route: getRecipeById,
    get: async (pathSet: any) => {
      const [ids, keys] = interpretPathSetWithIds(pathSet);

      return db
        .then(async () => {
          const recipes = await Recipe.find({ _id: ids }, toProjection(keys));
          return _.flatMap(recipes, (recipe: mongoose.Document) =>
            keys
              .filter((key) => recipe[key] !== undefined)
              .map((key) => ({
                path: [PathKey.RecipeById, recipe.id, key],
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
