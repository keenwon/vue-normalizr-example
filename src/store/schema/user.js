import { normalize, denormalize, schema } from 'normalizr';

const userSchema = new schema.Entity('user');

export default userSchema;