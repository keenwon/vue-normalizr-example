import { IModule, IModuleTree } from './module';
import { IStoreOptions, IStore } from './store';

import { install } from 'vuex';

export {
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  Dispatch,
  Commit,
  ActionContext,
  Payload,
  MutationPayload,
  DispatchOptions,
  CommitOptions,
  Getter,
  Action,
  Mutation,
  Plugin,
  ModuleOptions,
  GetterTree,
  ActionTree,
  MutationTree
} from 'vuex';

export {
  IModule as Module,
  IModuleTree as ModuleTree,
  IStoreOptions as StoreOptions,
  IStore as Store,
  install
};

export default {
  Store: IStore,
  install
};
