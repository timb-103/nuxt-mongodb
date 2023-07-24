import { MongoClient } from "mongodb"

let dbConnection = {} as any
let connecting = true
let connected = false

export const mongo = {
  db() {
    if (!connected && !connecting) {
      console.log("No mongo connection, trying to reconnect...")
      connectToMongo()
    }

    return dbConnection
  },
  connected() {
    return connected
  },
}

export async function connectToMongo() {
  console.log("Connecting to mongo database...")
  connecting = true

  // create mongo client
  const client = new MongoClient(useRuntimeConfig().MONGO_CONNECTION_STRING)

  // handle closing events
  function handleEventClosed(eventName: string, event: object) {
    console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`)
    process.exit(0)
  }

  client.on("serverClosed", (event: object) => handleEventClosed("serverClosed", event))
  client.on("topologyClosed", (event: object) => handleEventClosed("topologyClosed", event))

  // connect
  try {
    await client.connect()
    dbConnection = client.db(useRuntimeConfig().MONGO_DB)
    connected = true
    console.log("Connected to mongo database.")
  } catch (e) {
    console.log("Failed", e)
  }

  connecting = false
}
