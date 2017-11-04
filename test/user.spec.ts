import { suite, test, slow, timeout } from 'mocha-typescript';
import 'should';
import { mutations, USER_FETCH, USER_UPDATE } from '@/store/v2/modules/user';

@suite('User Test')
class UserTest {
  @test 'user fetch'() {
    const state = {
      ids: []
    };

    mutations[USER_FETCH](state, 1);

    return state.ids.should.deepEqual([1]);
  }
}