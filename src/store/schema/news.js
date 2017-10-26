import { normalize, denormalize, schema } from 'normalizr';
import userSchema from './user';
import commentSchema from './comment';

const newsSchema = new schema.Entity('news', {
  author: userSchema,
  comments: [ commentSchema ]
});

export default newsSchema;