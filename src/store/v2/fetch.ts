import Vue from 'vue';
import { Module, Store, Commit, CommitOptions } from 'vuex';
import { normalize, Schema } from 'normalizr';

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

export interface NRequestInit extends RequestInit {
  schema?: Schema;
}

export function fetch (input: RequestInfo, init?: NRequestInit): Promise<any> {
  return window.fetch(input, init)
    .then(response => response.json())
    .then(data => {
      let outputData;

      /**
       * schema 存在的话，处理数据，更新 state
       */
      if (init && init.schema) {
        let { entities, result } = normalize(data, init.schema);

        _store.commit('ENTITIES_UPDATE', entities);
        outputData = result;
      } else {
        outputData = data;
      }

      return outputData;
    });
}

export default fetch;
