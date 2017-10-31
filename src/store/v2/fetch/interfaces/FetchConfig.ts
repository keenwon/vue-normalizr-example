import { Schema } from 'normalizr';

export default interface FetchConfig {
  url: string;
  method: 'GET' | 'POST' | 'PATH' | 'DELETE' | 'PUT';
  schema?: Schema
};
