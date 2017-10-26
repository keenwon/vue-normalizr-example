import User from './user';

export default interface IComment {
  id: number;
  content: string;
  author: User;
};
