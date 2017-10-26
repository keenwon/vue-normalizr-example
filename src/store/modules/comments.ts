import { MutationTree, Mutation } from 'vuex';
import { IComment } from '../../types';

/**
 * State
 */
const state: Array<IComment> = [];


/**
 * Mutations
 */
const COMMENTS_FETCH = 'COMMENTS_FETCH';
const mutations: MutationTree<Array<IComment>> = {

  /**
   * get comment list
   * @param state state
   * @param payload comment list
   */
  [COMMENTS_FETCH](state: Array<IComment>, payload: Array<IComment>): void {
    state = payload
  }
}

/**
 * Action
 */
const actions = {
  getList() {
    
  }
}