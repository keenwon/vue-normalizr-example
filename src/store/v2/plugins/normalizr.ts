import Vue from 'vue';
import { Module, Store } from 'vuex';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import { denormalize, Schema } from 'normalizr';

let _schemas: Schema;

const ENTITIES_UPDATE = 'ENTITIES_UPDATE';
const ENTITIES_DELETE = 'ENTITIES_DELETE';
const ENTITIES_MERGE = 'ENTITIES_MERGE';

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
    /**
     * 插入 & 替换 entity
     */
    [ENTITIES_UPDATE](state: any, entities: any): void {
      Object.keys(entities).forEach((key: string) => {
        Vue.set(state, key, {
          ...(state[key] || {}),
          ...entities[key]
        });
      });
    },

    /**
     * 删除 entity
     */
    [ENTITIES_DELETE](state: any, entities: any): void {
      Object.keys(entities).forEach((key: string) => {
        Vue.set(state, key, omit(state[key], Object.keys(entities[key])));
      });
    },

    /**
     * merge entity
     */
    [ENTITIES_MERGE](state: any, entities: any): void {
      Object.keys(entities).forEach((key: string) => {
        Vue.set(state, key, merge({}, state[key] || {}, entities[key]));
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