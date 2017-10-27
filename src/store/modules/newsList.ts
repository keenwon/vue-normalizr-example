import { MutationTree, Mutation } from 'vuex';
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
const actions = {
  getNewsList(context: any) {
    return fetch('/api/news')
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        context.commit(NEWSLIST_FETCH, data);
      });
  }
}

export default {
  state,
  mutations,
  actions
};
