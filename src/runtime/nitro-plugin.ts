import type { NitroAppPlugin } from 'nitropack'
import { connectToMongo } from './server/utils/mongo'

export default <NitroAppPlugin>function (nitro) {
  connectToMongo()
}
