import { DBSchema } from 'idb';

export interface Schema extends DBSchema {
  files: {
    key: string;
    value: string;
  };
  points: {
    key: string;
    value: number;
  };
}
