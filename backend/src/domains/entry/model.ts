import { model, ObjectId, Schema } from 'mongoose';
import { USER_MODEL_NAME } from '../user/model';

const ENTRY_MODEL_NAME = 'Entry';

interface EntryInterface {
  date: Date;
  user: ObjectId;
  goal: number;
  done: number;
  comment: string;
}

const entrySchema = new Schema<EntryInterface>({
  date: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: USER_MODEL_NAME },
  goal: { type: Number },
  done: { type: Number },
  comment: { type: String },
});

const entryModel = model(ENTRY_MODEL_NAME, entrySchema);

export default entryModel;
