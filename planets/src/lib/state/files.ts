import { proxy, useSnapshot } from 'valtio';

import type { File } from '../../types';
import storage from '../storage';

interface State {
  root: string;

  keys: string[];
  save(key: File['key'], body: File['body'], upsert?: boolean): File | null;
  delete(key: File['key']): void;
}

const buildKey = (root: string, key: string) => {
  let k = key;
  if (k.startsWith('/')) k = k.slice(1);
  if (!k.startsWith(root)) k = `${root}/${k.replace(/^\//, '')}`;
  return k;
};

export const files = proxy<State>({
  root: '',

  keys: [],
  save(key, body, upsert = true) {
    const file: File = { key: buildKey(files.root, key), body };
    const isUpdate = files.keys.findIndex((key) => key === file.key) !== -1;
    if (isUpdate) {
      if (!upsert) return null;
      storage.put('files', file.key, file.body);
    } else {
      files.keys.push(file.key);
      storage.add('files', file.key, file.body);
    }
    return file;
  },
  delete(key) {
    files.keys = files.keys.filter((k) => k !== key);
    storage.delete('files', key);
  },
});

export const useFiles = () => {
  return [useSnapshot(files), files] as const;
};
