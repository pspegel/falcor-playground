import { atom } from 'falcor-json-graph';
import _ from 'lodash';
import { Types } from 'mongoose';

const HAVING_INIDICES = '[{integers}]';
const PATH_IDS = 'ids';
const HAVING_IDS = `[{keys:${PATH_IDS}}]`;

interface Properties {
  [key: string]: WithGettable;
}

interface WithGettable {
  gettable: boolean;
}

export const getGettableProperties = (properties: Properties) =>
  Object.keys(properties).filter((key) => properties[key].gettable);

export const toProjection = (properties: string[]) =>
  _.zipObject(properties, _.times(properties.length, _.constant(1)));

export const atomize = (value: any) => (Array.isArray(value) ? atom(value) : value);

interface PathSetWithIds {
  0: string;
  1: string[];
  2: string[];
  [PATH_IDS]: string[];
}

type InterpretPathSetWithIds = (pathSet: PathSetWithIds) => [Types.ObjectId[], string[]];

export const interpretPathSetWithIds: InterpretPathSetWithIds = (pathSet: PathSetWithIds) => [
  pathSet[PATH_IDS].map((id) => Types.ObjectId(id)),
  pathSet[2]
];

const toPathProps = (properties: string[]) => '[' + properties.map((key) => `"${key}"`).join(',') + ']';

export const pathBuilder = (pathKey: string) => {
  let path = pathKey;

  const withProperties = (properties: string[]) => {
    path += toPathProps(properties);

    return path;
  };

  return {
    withIndices: () => {
      path += HAVING_INIDICES;

      return path;
    },
    withIds: () => {
      path += HAVING_IDS;

      return {
        withProperties
      };
    }
  };
};
