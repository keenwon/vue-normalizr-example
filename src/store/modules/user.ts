import { MutationTree, Mutation } from 'vuex';
import { IUser } from '../../types';

/**
 * State
 */
interface IUserState {
  obj: {
    [userId: number]: IUser
  } | {}
};

const state: IUserState = {
  obj: {}
};

/**
 * Mutations
 */
const USER_FETCH = 'USER_FETCH';
const mutations: MutationTree<IUserState> = {

  /**
   * get user
   * @param state state
   * @param payload user
   */
  [USER_FETCH](state: IUserState, payload: any): void {
    state.obj = {
      ...state.obj,
      [payload.userId]: payload.user
    }
  }
}

/**
 * Action
 */
const actions = {
  getUser(context: any, userId: number) {
    return fetch(`/api/user/${userId}`)
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        context.commit(USER_FETCH, {
          userId: +userId,
          user: data
        });
      });
  }
}

export default {
  state,
  mutations,
  actions
};
