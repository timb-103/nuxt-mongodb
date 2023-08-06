import { Db } from 'mongodb'

export interface Mongo {
  db: () => Db
  connected: () => boolean
}
