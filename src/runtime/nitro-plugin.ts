import type { NitroAppPlugin } from 'nitropack'
import { connectToMongo } from './server/utils'

export default <NitroAppPlugin>function (nitro) {
  connectToMongo()
}
