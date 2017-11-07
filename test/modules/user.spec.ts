import { suite, test, slow, timeout } from 'mocha-typescript';
import { mockFetch } from '../mock/fetch';

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

    mockFetch(user);

    return store
      .dispatch('user/getItem', user.id)
      .then(() => {
        let checkState = store.state.user.ids.should.deep.equal([user.id]);
        let checkEntities = store.getters['user/item'](user.id).should.deep.equal(user);

        return checkState && checkEntities;
      });
  }

  @test 'user update'() {
    let user = {
      id: 1002,
      name: 'li si',
      email: 'lisi@example.com'
    };

    mockFetch(user);

    return store
      .dispatch('user/update', user)
      .then(() => {
        let checkState = store.state.user.ids.should.be.includes(user.id)
        let checkEntities = store.state.entities.user[user.id].should.deep.equal(user);

        return checkState && checkEntities;
      });
  }
}