const users = [
  {
    id: 1001,
    name: 'zhang san',
    email: 'zhangsan@example.com'
  },
  {
    id: 1002,
    name: 'li si',
    email: 'lisi@example.com'
  },
  {
    id: 1003,
    name: 'wang wu',
    email: 'wangwu@example.com'
  },
  {
    id: 1004,
    name: 'zhao liu',
    email: 'zhaoliu@example.com'
  },
  {
    id: 1005,
    name: 'xiao ming',
    email: 'xiaoming@example.com'
  },
  {
    id: 1006,
    name: 'xiao hong',
    email: 'xiaohong@example.com'
  },
  {
    id: 1007,
    name: 'xiao hei',
    email: 'xiaohei@example.com'
  }
];

const news = [
  {
    id: 201710260001,
    title: 'news 1',
    content: 'news content 1',
    author: users[0]
  },
  {
    id: 201710260002,
    title: 'news 2',
    content: 'news content 2',
    author: users[1]
  },
  {
    id: 201710260003,
    title: 'news 3',
    content: 'news content 3',
    author: users[2]
  },
  {
    id: 201710260004,
    title: 'news 4',
    content: 'news content 4',
    author: users[3]
  },
  {
    id: 201710260005,
    title: 'news 5',
    content: 'news content 5',
    author: users[4]
  },
  {
    id: 201710260006,
    title: 'news 6',
    content: 'news content 6',
    author: users[5]
  }
];

const comments = {
  '201710260001': [
    {
      id: 1000001,
      content: 'comments 1',
      author: users[0]
    },
    {
      id: 1000002,
      content: 'comments 2',
      author: users[6]
    }
  ],
  '201710260002': [
    {
      id: 1000003,
      content: 'comments 3',
      author: users[2]
    },
    {
      id: 1000004,
      content: 'comments 4',
      author: users[3]
    }
  ],
  '201710260006': [
    {
      id: 1000005,
      content: 'comments 5',
      author: users[3]
    },
    {
      id: 1000006,
      content: 'comments 6',
      author: users[4]
    }
  ]
}

module.exports = {
  news,
  users,
  comments
};