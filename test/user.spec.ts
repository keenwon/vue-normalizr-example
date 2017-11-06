import { suite, test, slow, timeout } from 'mocha-typescript';
import { mockFetch } from './mock/fetch';
import { userItemRequest, IFetchInit } from '@/store/v2/fetch'

import store from '@/store';
import 'chai';

@suite('User Test')
class UserTest {
  @test 'user fetch'() {
    let user = {
      id: 1001,
      name: 'zhang san',
      email: 'zhangsan@example.com'
    };

    let options: IFetchInit = {
      params: {
        userId: user.id
      }
    };

    mockFetch(userItemRequest, options, user);

    return store
      .dispatch('user/getItem', user.id)
      .then(() => {
        let checkState = store.state.user.ids.should.deep.equal([user.id]);
        let checkEntities = store.state.entities.user[user.id].should.deep.equal(user);

        return checkState && checkEntities;
      });
  }
}