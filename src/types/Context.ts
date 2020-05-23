import db from '@who-are-you-db/db';

export interface Context {
  db: typeof db;
  request: object;
}
