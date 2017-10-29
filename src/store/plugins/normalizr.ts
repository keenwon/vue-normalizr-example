import Vue from 'vue';
import { Store, Commit, CommitOptions } from 'vuex';
import { normalize, Schema } from 'normalizr';

export default (store: Store<any>): void => {
  const commit: Commit = store.commit;

  store.state.entities = Object.create(null);

  store.commit = function normalizrCommit(type: string, payload?: any, options?: CommitOptions): void {
    let newPayload;

    if (payload.schema && payload.data) {
      let normalizedPayload = normalize(payload.data, payload.schema);

      for (let key in normalizedPayload.entities) {
        Vue.set(store.state.entities, key, Object.assign(
          {}, 
          store.state.entities[key] || {},
          normalizedPayload.entities[key] || {}
        ));
      }

      newPayload = normalizedPayload.result;
    } else {
      newPayload = payload;
    }

    return commit(type, newPayload, options);
  };
};