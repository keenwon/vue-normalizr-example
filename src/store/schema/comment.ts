import { normalize, denormalize, schema } from 'normalizr';
import userSchema from './user';

const commentSchema: schema.Entity = new schema.Entity('comment', {
  author: userSchema
});

export default commentSchema;