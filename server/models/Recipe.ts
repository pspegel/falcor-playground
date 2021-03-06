import * as mongoose from 'mongoose';

import { WithTimestamps } from '../types';
import { DbModelName } from '../constants';
import { getGettableProperties } from '../helpers';

export interface RecipeProperties extends WithTimestamps {
  title: string;
  tags?: string[];
  introduction?: string;
  text?: string;
}

interface RecipeModel extends RecipeProperties, mongoose.Document {}

const properties = {
  title: { type: String, required: true, gettable: true },
  tags: { type: [String], required: false, gettable: true },
  introduction: { type: String, required: false, gettable: true },
  text: { type: String, required: false, gettable: true }
};

const recipeSchema = new mongoose.Schema(properties, { timestamps: true });

export const gettableRecipeProperties = [...getGettableProperties(properties), 'id'];

export default mongoose.model<RecipeModel>(DbModelName.Recipe, recipeSchema, DbModelName.Recipe);
