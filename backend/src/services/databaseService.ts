import { connect } from 'mongoose';
import _ from 'lodash';

export const init = async () => {
  try {
    await connect(process.env.DATABASE_URL);
    console.info('Successfully connected to DB');
  } catch (e) {
    console.error(e.message);
  }
};

init().then(_.noop).catch(_.noop);
