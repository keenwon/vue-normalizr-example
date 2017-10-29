import { MutationTree, ActionTree, ActionContext, Module, GetterTree } from 'vuex';
import { denormalize } from 'normalizr';
import newsSchema from '../schema/news';
import fetch from '../fetch';

/**
 * State
 */
interface INewsState {
  currentNewsId: number | null,
  newsIds: Array<number>
};

const state: INewsState = {
  currentNewsId: null,
  newsIds: []
};

/**
 * Getter
 */
const getters: GetterTree<INewsState, any> = {
  list(state: INewsState, getters: any, rootState: any): any {
    return denormalize(state.newsIds, [newsSchema], rootState.entities);
  },

  item(state: INewsState, getters: any, rootState: any): any {
    if (!state.currentNewsId) {
      return null;
    }

    return denormalize(state.currentNewsId, newsSchema, rootState.entities);
  }
};

/**
 * Mutations
 */
const NEWS_FETCH = 'NEWS_FETCH';
const NEWS_LIST_FETCH = 'NEWS_LIST_FETCH';
const mutations: MutationTree<INewsState> = {

  /**
   * get news
   * @param state state
   * @param payload news
   */
  [NEWS_FETCH](state: INewsState, payload: number): void {
    state.currentNewsId = payload;
  },

  /**
   * get news list
   * @param state state
   * @param payload news list
   */
  [NEWS_LIST_FETCH](state: INewsState, payload: Array<number>): void {
    state.newsIds = payload;
  }
}

/**
 * Action
 */
const actions: ActionTree<INewsState, any> = {
  getItem({ state, commit }: ActionContext<INewsState, any>, newsId: number) {
    if (typeof state.currentNewsId === 'number') {
      return;
    }

    return fetch(`/api/news/${newsId}`)
      .then(data => {
        let payload = {
          schema: newsSchema,
          data
        };
        commit(NEWS_FETCH, payload);
      });
  },

  getList({ state, commit }: ActionContext<INewsState, any>) {
    if (Array.isArray(state.newsIds) && state.newsIds.length > 0) {
      return;
    }

    return fetch('/api/news')
      .then(data => {
        let payload = {
          schema: [newsSchema],
          data
        };
        commit(NEWS_LIST_FETCH, payload);
      });
  }
}

const newsModule: Module<INewsState, any> = {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}

export default newsModule;
