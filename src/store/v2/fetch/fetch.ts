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
export function install(store: Store<any>) {
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

export function fetch({ url, method, schema }: IFetchConfig, init?: IFetchInit): Promise<any> {
  // 编译 url
  if (url.includes(':') && init && init.params) {
    url = compile(url)(init.params);
  }

  // query string
  if (method === 'GET' && init && init.body) {
    let query = stringify(init.body);

    if (url.includes('?')) {
      url = `${url}&${query}`;
    } else {
      url = `${url}?${query}`;
    }
  }

  // merge init
  init = merge({}, defaultInit, init);

  return window.fetch(url, init)
    .then(response => response.json())
    .then(responseData => {
      let data;

      /**
       * schema 存在的话，处理数据，更新 state
       */
      if (schema) {
        let { entities, result } = normalize(responseData, schema);

        _store.commit('ENTITIES_UPDATE', entities);
        data = result;
      } else {
        data = responseData;
      }

      return data;
    });
}

export default fetch;
