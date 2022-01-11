import { connect } from 'mongoose';

(async () => {
  try {
    await connect(process.env.DATABASE_URL);
    console.info('Successfully connected to DB');
  } catch (e) {
    console.error(e);
  }
})();
