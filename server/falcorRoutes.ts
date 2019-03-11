import { RouteDefinition } from 'falcor-router';
import mongoose from 'mongoose';
import _ from 'lodash';
import { ref } from 'falcor-json-graph';

import { PathKey, MONGO_ID } from './constants';
import Recipe, { gettableRecipeProperties } from './models/Recipe';
import db from './db';
import { toProjection, atomize, pathBuilder, interpretPathSetWithIds } from './helpers';

export const getRecipe = pathBuilder(PathKey.Recipe).withIndices();
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
    get: async () => {
      // TODO: Support ranges of indices instead of just "all".
      return db
        .then(async () => {
          const recipes = await Recipe.find({}, toProjection([MONGO_ID]), {});
          return recipes.map((recipe: mongoose.Document, index) => ({
            path: [PathKey.Recipe, index],
            value: ref([PathKey.RecipeById, recipe.id])
          }));
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
