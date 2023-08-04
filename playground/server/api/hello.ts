import { defineEventHandler } from 'h3'
import { mongo } from '#mongodb'

export default defineEventHandler(async () => {
  try {
    await mongo.db().collection('Users').find({}).limit(1).next()
  } catch (error) {
    console.log('Error:', error)
  }

  return 'Hi!'
})
