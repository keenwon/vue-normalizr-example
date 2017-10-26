const { normalize, denormalize, schema } = require('normalizr');

const user = new schema.Entity('user');

const comment = new schema.Entity('comment', {
  author: user
});

const news = new schema.Entity('news', {
  author: user,
  comments: [ comment ]
});

const mySchema = {
  newsList: [ news ],
  blacklist: [ user ]
}

// 待处理数据
const myData = {
  newsList: [
    {
      id: 1,
      title: 'news 1',
      author: {
        id: 1,
        name: 'zhang san',
        email: 'zhangsan@example.com'
      },
      comments: [
        {
          id: 1,
          content: 'comment 1',
          author: {
            id: 2,
            name: 'li si',
            email: 'lisi@example.com'
          }
        },
        {
          id: 2,
          content: 'comment 2',
          author: {
            id: 3,
            name: 'wang wu',
            email: 'wangwu@example.com'
          }
        },
        {
          id: 3,
          content: 'comment 3',
          author: {
            id: 4,
            name: 'zhao liu',
            email: 'zhaoliu@example.com'
          }
        }
      ]
    },
    {
      id: 2,
      title: 'news 2',
      author: {
        id: 4,
        name: 'zhao liu',
        email: 'zhangsan@example.com'
      },
      comments: [
        {
          id: 4,
          content: 'comment 4',
          author: {
            id: 2,
            name: 'li si',
            email: 'lisi@example.com'
          }
        },
        {
          id: 5,
          content: 'comment 5',
          author: {
            id: 1,
            name: 'zhang san',
            email: 'zhangsan@example.com'
          }
        }
      ]
    }
  ],
  blacklist: [
    {
      id: 5,
      name: 'xiao ming',
      email: 'xiaoming@example.com'
    }
  ]
};

const normalizedData = normalize(myData, mySchema);

// console.log(JSON.stringify(normalizedData, null, '  '));

console.log('=====================')

let data = denormalize({newsList: [1]}, mySchema, normalizedData.entities);

console.log(JSON.stringify(data, null, '  '))
