import { MutationTree, ActionTree, ActionContext, Module, GetterTree } from 'vuex';
import { denormalize } from 'normalizr';
import { IUser } from '../../types';
import userSchema from '../schema/user';
import fetch from '../fetch';

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
  item(state: IUserState, getters: any, rootState: any): Function {
    return (userId: number): any => {
      if (!rootState.entities.user) {
        return null;
      }

      return denormalize(userId, userSchema, rootState.entities)
    }
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
    state.ids.push(payload.userId);
  }
}

/**
 * Action
 */
const actions: ActionTree<IUserState, any> = {
  getItem({ commit, state, rootState }: ActionContext<IUserState, any>, userId: number): any {
    if (state.ids.includes(userId)) {
      // 当前 state 存在 userID
      return;
    } else if (rootState.entities.user && rootState.entities.user[userId]) {
      /**
       * 当前 state 不存在 userID，但是 entities 里面存在
       * 可能是 news 和 comments 中缓存的
       */
      return commit(USER_FETCH, {
        userId
      });
    }

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
