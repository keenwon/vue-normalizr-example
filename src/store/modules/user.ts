import { MutationTree, ActionTree, ActionContext, Module } from 'vuex';
import { denormalize } from 'normalizr';
import { IUser } from '../../types';
import userSchema from '../schema/user';
import fetch from '../fetch';

/**
 * State
 */
interface IUserState {
  id: number | null
};

const state: IUserState = {
  id: null
};

/**
 * Getters
 */
const getters = {
  item(state: IUserState, getters: any, rootState: any) {
    return denormalize(state.id, userSchema, rootState.entities);
  }
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
    state.id = payload.userId
  }
}

/**
 * Action
 */
const actions: ActionTree<IUserState, any> = {
  getItem({ commit }: ActionContext<IUserState, any>, userId: number) {
    return fetch(`/api/user/${userId}`)
      .then(data => {
        let payload = {
          schema: {
            user: userSchema
          },
          data: {
            userId: +userId,
            user: data
          }
        };

        commit(USER_FETCH, payload);
      });
  }
}

const userModule: Module<IUserState, any> = {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};

export default userModule;
