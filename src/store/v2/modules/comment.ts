import Vue from 'vue';
import { MutationTree, ActionTree, ActionContext, Module, GetterTree } from 'vuex';
import fetch, { IFetchInit, commentListRequest, commentDeleteRequest } from '../fetch';

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
  list(
    state: ICommentState,
    getters: GetterTree<ICommentState, any>,
    rootState: any,
    rootGetters: any
  ): Function {
    return (newsId: number): any => {
      let commentIds = state.map[newsId];

      if (!commentIds) {
        return [];
      }

      return rootGetters.getListFromCache({
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
const COMMENTS_DELETE = 'COMMENTS_DELETE';
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
  },

  /**
   * delete comment
   * @param state state
   * @param payload {newsId, commentId}
   */
  [COMMENTS_DELETE](state: ICommentState, payload: any): void {
    state.map = {
      ...state.map,
      [payload.newsId]: state.map[payload.newsId].filter(id => {
        return id !== payload.commentId;
      })
    };
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

    let options: IFetchInit = {
      params: {
        newsId,
      }
    };

    return fetch(commentListRequest, options)
      .then(data => {
        commit(COMMENTS_FETCH, {
          newsId,
          list: data
        });
      });
  },

  delete(
    { state, commit }: ActionContext<ICommentState, any>,
    { newsId, commentId }: { newsId: number, commentId: number }
  ): any {
    if (!state.map[newsId] || !state.map[newsId].includes(commentId)) {
      return;
    }

    let options: IFetchInit = {
      params: {
        newsId,
        commentId
      }
    };

    return fetch(commentDeleteRequest, options)
      .then(data => {
        commit(COMMENTS_DELETE, {
          newsId,
          commentId
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
