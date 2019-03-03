import { atom } from 'falcor-json-graph';
import _ from 'lodash';

interface Properties {
  [key: string]: WithGettable;
}

interface WithGettable {
  gettable: boolean;
}

export const getGettableProperties = (properties: Properties) =>
  Object.keys(properties).filter((key) => properties[key].gettable);

export const toPathKeys = (keys: string[]) => '[' + keys.map((key) => `"${key}"`).join(',') + ']';

export const toProjection = (keys: string[]) => _.zipObject(keys, _.times(keys.length, _.constant(1)));

export const atomize = (value: any) => (Array.isArray(value) ? atom(value) : value);
