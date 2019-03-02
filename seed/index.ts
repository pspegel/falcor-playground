import seeder from 'mongoose-seed';

import { DB_URL, ModelName } from 'server/constants';
import { fakeRecipies } from './recipe';

seeder.setLogOutput(true);
seeder.connect(DB_URL, () => {
  seeder.loadModels(['server/models/recipe']);

  seeder.clearModels([ModelName.recipe], () => {
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: ModelName.recipe,
    documents: fakeRecipies(4)
  }
];
