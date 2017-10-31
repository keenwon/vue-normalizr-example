import { MutationTree, ActionTree, ActionContext, Module, GetterTree } from 'vuex';
import { denormalize } from 'normalizr';
import commentSchema from '../schema/comment';
import { fetch, NRequestInit } from '../fetch';

/**
 * State
 */
interface ICommentState {
  map: {
    [newsId: number]: Array<number>
  }
};

const state: ICommentState = {
  map: {}
};

/**
 * Getters
 */
const getters: GetterTree<ICommentState, any> = {
  list(state: ICommentState, getters: any, rootState: any, rootGetters: any): any {
    return (newsId: number) => {
      let commentIds = state.map[newsId];
      return rootGetters['list']({
        type: 'comment',
        ids: commentIds
      });
    }
  }
};

/**
 * Mutations
 */
const COMMENTS_FETCH = 'COMMENTS_FETCH';
const mutations: MutationTree<ICommentState> = {

  /**
   * get comment list
   * @param state state
   * @param payload comment list
   */
  [COMMENTS_FETCH](state: ICommentState, payload: any): void {
    state.map = {
      ...state.map,
      [payload.newsId]: payload.list
    }
  }
}

/**
 * Action
 */
const actions: ActionTree<ICommentState, any> = {
  getList({ state, commit }: ActionContext<ICommentState, any>, newsId: number): any {
    if (state.map[newsId]) {
      return;
    }

    let options: NRequestInit = {
      schema: [commentSchema]
    };

    return fetch(`/api/comments/${newsId}`, options)
      .then(data => {
        commit(COMMENTS_FETCH, {
          newsId,
          list: data
        });
      });
  }
}

const commentModule: Module<ICommentState, any> = {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}

export default commentModule;
