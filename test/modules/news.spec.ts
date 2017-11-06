import { suite, test, slow, timeout } from 'mocha-typescript';
import { mockFetch } from '../mock/fetch';
import { newsItemRequest, newsListRequest, IFetchInit } from '@/store/v2/fetch';

import store from '@/store';
import 'chai';

@suite('News Test')
class NewsTest {
  @test 'news getList'() {
    let newsList = [
      {
        id: 201710260001,
        title: 'news 1',
        content: 'news content 1',
        author: {
          id: 1004,
          name: 'zhao liu',
          email: 'zhaoliu@example.com'
        }
      },
      {
        id: 201710260002,
        title: 'news 2',
        content: 'news content 2',
        author: {
          id: 1004,
          name: 'zhao liu',
          email: 'zhaoliu@example.com'
        }
      }
    ];

    mockFetch(newsListRequest, {}, newsList);

    return store
      .dispatch('news/getList')
      .then(() => {
        let newsIds = [201710260001, 201710260002];

        let checkState = store.state.news.listNewsIds.should.deep.equal(newsIds);
        let checkEntities = store.getters['news/list'].should.deep.equal(newsList);

        return checkState && checkEntities;
      });
  }

  @test 'news getItem'() {
    let newsId = 11111; // 随便写，没影响

    let news = {
      id: newsId,
      title: 'news 1',
      content: 'news content 1',
      author: {
        id: 100001,
        name: 'zhao liu',
        email: 'zhaoliu@example.com'
      }
    };

    let options: IFetchInit = {
      params: {
        newsId
      }
    };

    mockFetch(newsItemRequest, options, news);

    return store
      .dispatch('news/getItem', newsId)
      .then(() => {
        let checkState = store.state.news.detailNewsIds.should.includes(newsId);
        let checkEntities = store.getters['news/item'](newsId).should.deep.equal(news);

        return checkState && checkEntities;
      });
  }
}