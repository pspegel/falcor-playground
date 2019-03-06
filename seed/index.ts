import seeder from 'mongoose-seed';

import { DB_URL, DbModelName } from 'server/constants';
import { fakeRecipes } from './recipe';

seeder.setLogOutput(true);
seeder.connect(DB_URL, () => {
  seeder.loadModels(['server/models/recipe']);

  seeder.clearModels([DbModelName.Recipe], () => {
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: DbModelName.Recipe,
    documents: fakeRecipes(4)
  }
];
