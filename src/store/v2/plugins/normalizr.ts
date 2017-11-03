import Vue from 'vue';
import { Module, Store } from 'vuex';
import { denormalize, Schema } from 'normalizr';

let _schemas: Schema;

const ENTITIES_UPDATE = 'ENTITIES_UPDATE';

/**
 * entities module
 */
const entitiesModule: Module<any, any> = {
  state: Object.create(null),

  getters: {
    getItemFromCache(state: any, getters: any, rootState: any): Function {
      return ({ type, id }: { type: string, id: number }): any => {
        if (typeof type !== 'string' || typeof id !== 'number') {
          throw new Error('[getItemFromCache] Missing required argument.');
        }

        if (!rootState.entities[type]) {
          return null;
        }

        return denormalize(id, _schemas[type], rootState.entities);
      }
    },

    getListFromCache(state: any, getters: any, rootState: any): Function {
      return ({ type, ids }: { type: string, ids: Array<number> }): Array<any> => {
        if (typeof type !== 'string' || !Array.isArray(ids)) {
          throw new Error('[getListFromCahce] Missing required argument.');
        }

        if (!rootState.entities[type] || ids.length === 0) {
          return [];
        }

        return denormalize(ids, [_schemas[type]], rootState.entities);
      }
    }
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

  return (store: Store<any>): void => {
    // register entities module
    store.registerModule('entities', entitiesModule);
  };
}