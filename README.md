# Nuxt MongoDB

A simple way to use mongoDB in your Nuxt 3 project.

## Usage

Install the module:

```sh
npm i -D nuxt-mongodb
```

Add `nuxt-mongodb` in the `modules` array in `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  modules: ['nuxt-mongodb'],
})
```

Add your mongo connection string and main database name in your `.env` file:

```env
MONGO_CONNECTION_STRING={{your_mongo_connection_string}}
MONGO_DB={{your_mongo_db_name}}
```

When you start your project, mongo will connect and you can use it anywhere like this:

```js
const db = mongo.db()
const response = await db.collection('YOUR_COLLECTION').find()
```
