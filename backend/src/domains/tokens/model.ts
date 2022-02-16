import { Schema, model, ObjectId } from 'mongoose';
import { USER_MODEL_NAME } from '../user/model';

export const TOKEN_MODEL_NAME = 'Token';

export interface tokenInterface {
  token: string;
  user: ObjectId;
}

export const tokenSchema = new Schema<tokenInterface>({
  user: { type: Schema.Types.ObjectId, required: true, ref: USER_MODEL_NAME },
  token: { type: String, unique: true, required: true },
});

const Token = model(TOKEN_MODEL_NAME, tokenSchema);

export default Token;
