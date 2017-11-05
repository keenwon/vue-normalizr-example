import { suite, test, slow, timeout } from 'mocha-typescript';
import { mockFetch, resetFetch } from './mock/fetch';
import { getters } from '@/store/v2/modules/user';

import store from '@/store';
import 'chai';

@suite('User Test')
class UserTest {
  after() {
    resetFetch();
  }

  @test 'user fetch'() {
    let id = 1001;

    mockFetch({
      id,
      name: 'zhang san',
      email: 'zhangsan@example.com'
    });

    return store
      .dispatch('user/getItem', id)
      .then(() => {
        return store.state.user.ids
          .should.deep.equal([id]);
      });
  }
}