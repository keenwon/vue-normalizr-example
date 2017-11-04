import 'should';
import { mutations, USER_FETCH, USER_UPDATE } from '../../src/store/v2/modules/user';

describe('User Test', function () {
  describe('# Mutation Test', function () {
    it('user fetch', function () {
      const state = {
        ids: []
      };

      mutations[USER_FETCH](state, 1);

      return state.ids.should.deepEqual([1]);
    });
  });
});