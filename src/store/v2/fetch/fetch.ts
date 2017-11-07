import { Store } from 'vuex';
import { normalize, Schema } from 'normalizr';
import merge from 'lodash/merge';
import { IFetchConfig } from './interfaces/IFetchConfig';
import { IFetchInit } from './interfaces/IFetchInit';
import { compile } from 'path-to-regexp';
import { stringify } from 'query-string';

/**
 * vuex store
 */
let _store: Store<any>;

/**
 * fetch install
 * @param store vuex store
 */
export function install(store: Store<any>): void {
  if (_store) {
    return;
  }

  _store = store;
}

/**
 * default RequestInit
 */
const defaultInit = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * 处理 fetch 参数
 */
export function fetchParamParser(config: IFetchConfig, init?: IFetchInit): [string, IFetchConfig] {
  let { url, method, schema } = config;

  // 解析 url
  if (url.includes(':') && init && init.params) {
    url = compile(url)(init.params);
  }

  // query string
  if (method === 'GET' && init && init.body) {
    let query = stringify(init.body);

    url = url.includes('?')
      ? `${url}&${query}`
      : `${url}?${query}`;
  }

  // merge init
  init = merge({ method }, defaultInit, init);

  return [url, <IFetchConfig>init];
}

export function fetch(config: IFetchConfig, init?: IFetchInit): Promise<any> {
  let { schema, method } = config;

  // parser param
  let [url, newInit] = fetchParamParser(config, init);

  let mutationType: string;
  switch (method) {
    case 'GET':
    case 'POST':
      mutationType = 'ENTITIES_UPDATE';
      break;
    case 'DELETE':
      mutationType = 'ENTITIES_DELETE';
      break;
    case 'PUT':
    case 'PATCH':
    default:
      mutationType = 'ENTITIES_MERGE';
      break;
  }

  return window.fetch(url, newInit)
    .then(response => response.json())
    .then(responseData => {
      let data;

      /**
       * schema 存在的话，处理数据，更新 state
       */
      if (schema) {
        let { entities, result } = normalize(responseData, schema);

        _store.commit(mutationType, entities);
        data = result;
      } else {
        data = responseData;
      }

      return data;
    });
}

export default fetch;
