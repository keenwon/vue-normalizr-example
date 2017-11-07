import { MutationTree, ActionTree, ActionContext, Module, GetterTree } from 'vuex';
import { IUser } from '@/types';
import fetch, { IFetchInit, userItemRequest, userUpdateRequest } from '../fetch';

/**
 * State
 */
interface IUserState {
  ids: Array<number>
};

const state: IUserState = {
  ids: []
};

/**
 * Getters
 */
const getters: GetterTree<IUserState, any> = {
  item(
    state: IUserState,
    getters: GetterTree<IUserState, any>,
    rootState: any,
    rootGetters: any
  ): Function {
    return (userId: number): any => {
      return rootGetters.getItemFromCache({
        type: 'user',
        id: userId
      });
    }
  }
};

/**
 * Mutations
 */
const USER_FETCH = 'USER_FETCH';
const USER_UPDATE = 'USER_UPDATE';
const mutations: MutationTree<IUserState> = {

  /**
   * get user
   * @param state state
   * @param payload user
   */
  [USER_FETCH](state: IUserState, payload: number): void {
    if (state.ids.includes(payload)) {
      return;
    }

    state.ids.push(payload);
  },

  [USER_UPDATE](state: IUserState, payload: number): void {
    if (state.ids.includes(payload)) {
      return;
    }

    state.ids.push(payload);
  }
}

/**
 * Action
 */
const actions: ActionTree<IUserState, any> = {
  getItem({ commit, state, rootState }: ActionContext<IUserState, any>, userId: number): Promise<any> {
    if (state.ids.includes(userId)) {
      // 当前 state 存在 userID
      return Promise.resolve(null);
    } else if (rootState.entities.user && rootState.entities.user[userId]) {
      /**
       * 当前 state 不存在 userID，但是 entities 里面存在
       * 可能是 news 和 comments 中缓存的
       */
      commit(USER_FETCH, {
        userId
      });

      return Promise.resolve(null);
    }

    let options: IFetchInit = {
      params: {
        userId
      }
    };

    return fetch(userItemRequest, options)
      .then(data => {
        commit(USER_FETCH, data);
      });
  },

  update({ commit, state, rootState }: ActionContext<IUserState, any>, user: IUser): any {
    let options: IFetchInit = {
      body: JSON.stringify(user)
    };

    return fetch(userUpdateRequest, options)
      .then(data => {
        commit(USER_UPDATE, data);
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
