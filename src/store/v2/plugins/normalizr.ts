import Vue from 'vue';
import { Module, Store, Commit, CommitOptions } from 'vuex';
import { denormalize, Schema } from 'normalizr';

interface NStore<T> extends Store<T>, GlobalFetch { };

let _schemas: Schema;

const ENTITIES_UPDATE = 'ENTITIES_UPDATE';

const entitiesModule: Module<any, any> = {
  state: Object.create(null),

  getters: {
    item(state: any, getters: any, rootState: any): any {
      return ({ type, id }: { type: string, id: number }) => {
        if (typeof type !== 'string' || typeof id !== 'number' || !rootState.entities[type]) {
          return null;
        }

        return denormalize(id, _schemas[type], rootState.entities);
      }
    },

    list(state: any, getters: any, rootState: any): Function {
      return ({ type, ids }: { type: string, ids: Array<number> }): Array<any> => {
        if (!type || !rootState.entities[type]
          || !Array.isArray(ids) || ids.length === 0) {
          return [];
        }

        return denormalize(ids, [_schemas[type]], rootState.entities);
      }
    },
  },

  mutations: {
    [ENTITIES_UPDATE](state: any, payload: any): void {
      Object.keys(payload).forEach((key: string) => {
        Vue.set(state, key, {
          ...(state[key] || {}),
          ...payload[key]
        });
      });
    }
  }
};

export default function normalizrPluginCreator(schemas: Schema) {
  _schemas = schemas;

  return (store: NStore<any>): void => {
    // register entities module
    store.registerModule('entities', entitiesModule);
  };
}