import _ from 'lodash';

export const projectToArray = <T>(obj: any, properties: string[]): T[] => {
  const result = [];
  Object.keys(obj).forEach((key) => {
    if (isNaN(Number.parseInt(key, 10))) {
      return;
    }

    const temp = _.pick(obj[key], properties);

    result.push(temp);
  });

  return result;
};
