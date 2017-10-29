import Vue from 'vue';
import { Store, Commit, CommitOptions } from 'vuex';
import { normalize, Schema } from 'normalizr';

export default (store: Store<any>): void => {
  // entities 挂在 state 上
  Vue.set(store.state, 'entities', Object.create(null));

  // hook commit
  const commit: Commit = store.commit;
  store.commit = function normalizrCommit(type: string, payload?: any, options?: CommitOptions): void {
    let newPayload: any;

    // schema 存在的话，执行 normalizr
    if (payload.schema && payload.data) {
      let normalizedPayload = normalize(payload.data, payload.schema);

      Vue.set(store.state, 'entities', {
        ...store.state.entities,
        ...normalizedPayload.entities
      });

      newPayload = normalizedPayload.result;
    } else {
      newPayload = payload;
    }

    return commit(type, newPayload, options);
  };
};