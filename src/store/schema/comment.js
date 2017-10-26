import { normalize, denormalize, schema } from 'normalizr';
import userSchema from './user';

const commentSchema = new schema.Entity('comment', {
  author: userSchema
});

export default commentSchema;