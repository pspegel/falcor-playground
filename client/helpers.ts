import _ from 'lodash';

export const project = <T>(obj: any, properties: string[]): T[] =>
  _.toArray(obj).map((value) => _.pick(value, properties)) as any;
