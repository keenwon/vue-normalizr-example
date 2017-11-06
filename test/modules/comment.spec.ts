import { suite, test, slow, timeout } from 'mocha-typescript';
import { mockFetch } from '../mock/fetch';
import { commentListRequest, IFetchInit } from '@/store/v2/fetch'
import { normalize } from 'normalizr';
import schemas from '@/store/v2/schema'

import store from '@/store';
import 'chai';

@suite('Comment Test')
class CommentTest {
  @test 'comment getList'() {
    let newsId = '123'; // 随便写不影响

    let comments = [
      {
        id: 1000001,
        content: 'comments 1',
        author: {
          id: 1003,
          name: 'wang wu',
          email: 'wangwu@example.com'
        }
      },
      {
        id: 1000002,
        content: 'comments 2',
        author: {
          id: 1003,
          name: 'wang wu',
          email: 'wangwu@example.com'
        }
      }
    ];

    let normalizedData = normalize(comments, [schemas.comment]);

    let options: IFetchInit = {
      params: {
        newsId
      }
    };

    mockFetch(commentListRequest, options, comments);

    return store
      .dispatch('comment/getList', newsId)
      .then(() => {
        let checkState = store.state.comment.map[newsId].should.deep.equal(normalizedData.result);
        let checkEntities = store.state.entities.comment.should.deep.equal(normalizedData.entities.comment);

        return checkState && checkEntities;
      });
  }
}