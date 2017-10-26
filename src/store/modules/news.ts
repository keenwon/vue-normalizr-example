import { MutationTree, Mutation } from 'vuex';
import { INews } from '../../types';

/**
 * State
 */
const state: Array<INews> = [];


/**
 * Mutations
 */
const NEWS_FETCH = 'COMMENTS_FETCH';
const mutations: MutationTree<Array<INews>> = {

  /**
   * get comment list
   * @param state state
   * @param payload news list
   */
  [NEWS_FETCH](state: Array<INews>, payload: Array<INews>): void {
    Array.prototype.push.call(state, ...payload);
  }
}

/**
 * Action
 */
const actions = {
  getNewsList(context: any) {
    return fetch('/api/news')
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        context.commit(NEWS_FETCH, data);
      });
  }
}

export default {
  state,
  mutations,
  actions
};
