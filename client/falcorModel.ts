import { Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const source = new HttpDataSource('/model.json', { timeout: 0 });

export const model = new Model({
  source
});
