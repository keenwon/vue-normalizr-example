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
  list(state: INewsState, getters: any, rootState: any, rootGetter: any): any {
    return rootGetter['list']({
      type: 'news',
      ids: state.newsIds
    });
  },

  item(state: INewsState, getters: any, rootState: any, rootGetter: any): any {
    if (!state.currentNewsId) {
      return null;
    }

    return rootGetter['item']({
      type: 'news',
      id: state.currentNewsId
    });
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

    let options = {
      schema: newsSchema
    };

    return fetch(`/api/news/${newsId}`, options)
      .then(data => {
        commit(NEWS_FETCH, data);
      });
  },

  getList({ state, commit }: ActionContext<INewsState, any>) {
    if (Array.isArray(state.newsIds) && state.newsIds.length > 0) {
      return;
    }

    let options = {
      schema: [newsSchema]
    };

    return fetch('/api/news', options)
      .then(data => {
        commit(NEWS_LIST_FETCH, data);
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