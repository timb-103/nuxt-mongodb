import { MongoClient, Db } from "mongodb"
import { red, green, cyan, yellow } from 'console-log-colors';
let connection: Db | null = null
let connecting = true
let connected = false

export const mongo = {
  db() {
    if (connection) {
      return connection
    }

    if (!connected && !connecting) {
      connectToMongo()
    }

    console.log(yellow.bold.underline("No mongoDB connection, trying to reconnect..."))
    throw new Error("No mongoDB connection, trying to reconnect...")
  },
  connected() {
    return connected
  },
}

export async function connectToMongo() {
  console.log(cyan.bold.underline('Connecting to mongoDB...'))
  connecting = true

  // create mongo client
  const client = new MongoClient(useRuntimeConfig().MONGO_CONNECTION_STRING)

  client.on("serverClosed", (event: object) => handleEventClosed("serverClosed", event))
  client.on("topologyClosed", (event: object) => handleEventClosed("topologyClosed", event))

  try {
    // connect
    await client.connect()

    // create a connection to the db from env
    connection = client.db(useRuntimeConfig().MONGO_DB)

    // set to connected
    connected = true

    console.log(green.bold.underline("Connected to mongoDB."))
  } catch (e) {
    console.log(red.bold.underline("Failed to connect to mongoDB"), e)
  }

  connecting = false
}

// handle closing events
function handleEventClosed(eventName: string, event: object) {
  console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`)
  process.exit(0)
}
