import { Store, StoreOptions, ModuleTree } from 'vuex';
import merge from 'lodash/merge';
import { IModuleTree } from './module';

export interface IStoreOptions<S> extends StoreOptions<S> {
  modules?: IModuleTree<S>;
};

function applyModuleMixin<S>(moduleTree: IModuleTree<S>): ModuleTree<S> {
  let vuexModuleTree: ModuleTree<S> = {};

  for(let moduleName in moduleTree) {
    let module = moduleTree[moduleName];

    if (module.mixin) {
      vuexModuleTree[moduleName] = merge({}, module);
    } else {
      vuexModuleTree[moduleName] = module;
    }
  }

  return vuexModuleTree;
}

export class IStore<S> extends Store<S> {
  constructor(options: IStoreOptions<S>) {
    let storeOptions: StoreOptions<S> = options;

    if (options.modules) {
      storeOptions.modules = applyModuleMixin<S>(options.modules);
    }

    super(storeOptions);
  }
};
