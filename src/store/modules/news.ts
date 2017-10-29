import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
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
const getters = {
  list(state: INewsState, getters: any, rootState: any) {
    return denormalize(state.newsIds, [newsSchema], rootState.entities);
  },

  item(state: INewsState, getters: any, rootState: any) {
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
  getItem(context: ActionContext<INewsState, any>, newsId: number) {
    return fetch(`/api/news/${newsId}`)
      .then(data => {
        let payload = {
          schema: newsSchema,
          data
        };
        context.commit(NEWS_FETCH, payload);
      });
  },

  getList({ commit }: ActionContext<INewsState, any>) {
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
