import { suite, test } from 'mocha-typescript';
import 'should';

import { mutations, USER_FETCH, USER_UPDATE } from '../../src/store/v2/modules/user';

@suite
class MutationTest {
  @test 'user fetch' () {
    const state = {
      ids: []
    };

    mutations[USER_FETCH](state, 1);

    return state.ids.should.deepEqual([1]);
  }
}