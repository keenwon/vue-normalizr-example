import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { INews } from '../../types';

/**
 * State
 */
interface INewsState {
  currentNews: INews | null
};

const state: INewsState = {
  currentNews: null
};

/**
 * Mutations
 */
const NEWS_FETCH = 'NEWS_FETCH';
const mutations: MutationTree<INewsState> = {

  /**
   * get news list
   * @param state state
   * @param payload news list
   */
  [NEWS_FETCH](state: INewsState, payload: INews): void {
    state.currentNews = payload;
  }
}

/**
 * Action
 */
const actions: ActionTree<INews, INews> = {
  getNews(context: ActionContext<INews, INews>, newsId: number) {
    return fetch(`/api/news/${newsId}`)
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        context.commit(NEWS_FETCH, data);
      });
  }
}

const newsModule: Module<any, any> = {
  state,
  mutations,
  actions
}

export default newsModule;
