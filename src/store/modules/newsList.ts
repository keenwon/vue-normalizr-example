import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { INews } from '../../types';

/**
 * State
 */
interface INewsListState {
  list: Array<INews>
};

const state: INewsListState = {
  list: []
};


/**
 * Mutations
 */
const NEWSLIST_FETCH = 'NEWSLIST_FETCH';
const mutations: MutationTree<INewsListState> = {

  /**
   * get news list
   * @param state state
   * @param payload news list
   */
  [NEWSLIST_FETCH](state: INewsListState, payload: Array<INews>): void {
    state.list = payload;
  }
}

/**
 * Action
 */
const actions: ActionTree<INewsListState, INewsListState> = {
  getNewsList({ commit }: ActionContext<INewsListState, INewsListState>) {
    return fetch('/api/news')
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        commit(NEWSLIST_FETCH, data);
      });
  }
}

const newsListModule: Module<any, any> = {
  state,
  mutations,
  actions
}

export default newsListModule;
