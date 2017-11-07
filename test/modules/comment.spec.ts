import { suite, test, slow, timeout } from 'mocha-typescript';
import { mockFetch } from '../mock/fetch';

import store from '@/store';
import 'chai';

@suite('Comment Test')
class CommentTest {
  @test 'comment getList'() {
    let newsId = 123; // 随便写不影响

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

    mockFetch(comments);

    return store
      .dispatch('comment/getList', newsId)
      .then(() => {
        let commentIds = [1000001, 1000002];

        let checkState = store.state.comment.map[newsId].should.deep.equal(commentIds);
        let checkEntities = store.getters['comment/list'](newsId).should.deep.equal(comments);

        return checkState && checkEntities;
      });
  }

  @test async 'comment delete'() {
    let newsId = Date.now();
    let deleteCommentId = 1000001;

    const comments = [
      {
        id: deleteCommentId,
        content: 'comments 1',
        author: {
          id: 1006,
          name: 'xiao hong',
          email: 'xiaohong@example.com'
        }
      },
      {
        id: 1000002,
        content: 'comments 2',
        author: {
          id: 1006,
          name: 'xiao hong',
          email: 'xiaohong@example.com'
        }
      }
    ];

    // mock get commemts
    mockFetch(comments);

    // mock delete comment
    mockFetch({
      id: deleteCommentId
    });

    await store.dispatch('comment/getList', newsId);

    return store
      .dispatch('comment/delete', {newsId, commentId: deleteCommentId})
      .then(() => {
        let commentIds = [1000001, 1000002];

        let checkState = store.state.comment.map[newsId].should.deep.equal([1000002]);
        let checkEntities = store.getters['comment/list'](newsId).should.deep.equal([comments[1]]);

        return checkState && checkEntities;
      });
  }
}