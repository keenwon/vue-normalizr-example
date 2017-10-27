import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { IComment } from '../../types';
import fetch from '../fetch';

/**
 * State
 */
interface ICommentState {
  obj: {
    [newsId: number]: Array<IComment>
  }
};

const state: ICommentState = {
  obj: {}
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
    state.obj = {
      ...state.obj,
      [payload.newsId]: payload.list
    }
  }
}

/**
 * Action
 */
const actions: ActionTree<ICommentState, any> = {
  getList({ commit }: ActionContext<ICommentState, any>, newsId: number) {
    return fetch(`/api/comments/${newsId}`)
      .then(data => {
        commit(COMMENTS_FETCH, {
          newsId: +newsId,
          list: data
        });
      });
  }
}

const commentModule: Module<ICommentState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default commentModule;
