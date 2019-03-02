import * as mongoose from 'mongoose';

import { WithTimestamps } from '../types';
import { ModelName } from '../constants';

export interface RecipeProperties extends WithTimestamps {
  title: string;
  tags?: string[];
  introduction?: string;
  text?: string;
}

interface RecipeModel extends RecipeProperties, mongoose.Document {}

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: false },
    introduction: { type: String, required: false },
    text: { type: String, required: false }
  },
  { timestamps: true }
);

export default mongoose.model<RecipeModel>(ModelName.recipe, recipeSchema, ModelName.recipe);
