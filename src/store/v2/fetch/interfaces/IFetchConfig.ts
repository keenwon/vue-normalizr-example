import { Schema } from 'normalizr';

export interface IFetchConfig {
  url: string;
  method: 'GET' | 'POST' | 'PATH' | 'DELETE' | 'PUT';
  schema?: Schema
};
