import IUser from './user';
import IComment from './comment';

export default interface INews {
  id: number;
  title: string;
  content: string;
  author: IUser;
  comments? : Array<IComment>;
};
