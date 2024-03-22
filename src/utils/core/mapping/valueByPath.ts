import { CrePath } from '@models/core/types';

export const getValueByPath = <T>(obj: T, path: CrePath<T>) => {
  const parts = (path as string).split('.');
  /* eslint-disable */
  let result = obj as any;

  for (const part of parts) {
    if (typeof result !== 'object' || result === null) {
      return undefined;
    }
    result = result[part];
  }

  return result;
};

export const setValueByPath = <T extends object>(
  obj: T,
  path: CrePath<T>,
  /* eslint-disable */ value: any
): T => {
  const parts = (path as string).split('.');
  const result = { ...obj };
  /* eslint-disable */
  let current: any = result;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];

    if (typeof current[part] !== 'object' || current[part] === null) {
      current[part] = {};
    }

    current = current[part];
  }

  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;

  return result;
};
