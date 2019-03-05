import { HttpDataSource, Model } from 'falcor';

const source = new HttpDataSource('/model.json', { timeout: 0 });

export const model = new Model({
  source
});
