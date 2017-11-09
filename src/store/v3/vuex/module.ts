import { Module, ModuleTree } from 'vuex';

export interface IModule<S, R> extends Module<S, R> {
  mixin?: Array<Module<S, R>>;
};

export interface IModuleTree<R> extends ModuleTree<R> {
  [key: string]: IModule<any, R>;
};
