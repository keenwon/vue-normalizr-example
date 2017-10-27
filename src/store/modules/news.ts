import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { INews } from '../../types';

/**
 * State
 */
interface INewsState {
  currentNews: INews | null,
  list: Array<INews>
};

const state: INewsState = {
  currentNews: null,
  list: []
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
  [NEWS_FETCH](state: INewsState, payload: INews): void {
    state.currentNews = payload;
  },

  /**
   * get news list
   * @param state state
   * @param payload news list
   */
  [NEWS_LIST_FETCH](state: INewsState, payload: Array<INews>): void {
    state.list = payload;
  }
}

/**
 * Action
 */
const actions: ActionTree<INewsState, any> = {
  getItem(context: ActionContext<INewsState, any>, newsId: number) {
    return fetch(`/api/news/${newsId}`)
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        context.commit(NEWS_FETCH, data);
      });
  },

  getList({ commit }: ActionContext<INewsState, any>) {
    return fetch('/api/news')
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        commit(NEWS_LIST_FETCH, data);
      });
  }
}

const newsModule: Module<INewsState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default newsModule;
