import { Store } from 'vuex';
import { normalize, Schema } from 'normalizr';
import FetchConfig from './interfaces/FetchConfig';
import FetchInit from './interfaces/FetchInit';
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

export function fetch({ url, method, schema }: FetchConfig, init?: FetchInit) {
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

  window.fetch(url, init)
}

// export default fetch;
