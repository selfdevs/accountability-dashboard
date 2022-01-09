import { config } from 'dotenv';
import * as fs from 'fs';

(() => {
  if (fs.existsSync('.env.local')) {
    config({ path: '.env.local' });
  } else {
    config();
  }
})();
