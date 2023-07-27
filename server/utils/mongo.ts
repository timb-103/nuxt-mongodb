import { MongoClient, Db } from "mongodb"

let connection: Db | null = null
let connecting = true
let connected = false

/**
 * MongoDB utility object providing functions to interact with the database.
 */
export const mongo = {
  /**
  * Get the MongoDB database connection.
  * @returns {Db} The MongoDB database connection.
  * @throws {Error} Throws an error if there is no active MongoDB connection.
  */
  db(): Db {
    if (connection) {
      return connection
    }

    if (!connected && !connecting) {
      connectToMongo()
    }

    console.log("No mongoDB connection, trying to reconnect...")
    throw new Error("No mongoDB connection, trying to reconnect...")
  },

  /**
   * Check if the MongoDB client is currently connected to the database.
   * @returns {boolean} True if the MongoDB client is connected.
   */
  connected() {
    return connected
  },
}

/**
 * Connects to MongoDB and sets up event listeners for closing events.
 * @returns {Promise<void>} A Promise that resolves when the connection is established.
 */
export async function connectToMongo(): Promise<void> {
  console.log("Connecting to mongoDB...")
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

    console.log("Connected to mongoDB.")
  } catch (e) {
    console.log("Failed to connect to mongoDB", e)
  }

  connecting = false
}

/**
 * Handles MongoDB closing events and exits the process.
 * @param {string} eventName - The name of the closing event.
 * @param {object} event - The event object.
 */
function handleEventClosed(eventName: string, event: object) {
  console.log(`received ${eventName}: ${JSON.stringify(event, null, 2)}`)
  process.exit(0)
}
