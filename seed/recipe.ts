import _ from 'lodash';
import { title } from 'casual';

import { RecipeProperties } from 'server/models/Recipe';

const generate = (): RecipeProperties => ({
  title
});

export const fakeRecipies = (size: number): RecipeProperties[] => _.times(size, generate);
