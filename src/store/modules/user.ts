import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
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
const actions: ActionTree<IUserState, any> = {
  getItem({ commit }: ActionContext<IUserState, any>, userId: number) {
    return fetch(`/api/user/${userId}`)
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        commit(USER_FETCH, {
          userId: +userId,
          user: data
        });
      });
  }
}

const userModule: Module<IUserState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default userModule;
