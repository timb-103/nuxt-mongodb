# Nuxt 3 MongoDB Layer

A simple way to use mongoDB in your Nuxt 3 project.

## Usage

Install the module:

```sh
npm i -D nuxt-mongodb
```

Add the module in the `layers` array in `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  layers: ["nuxt-mongodb"],
})
```

Add your mongo connection string and main database name in your `.env` file:

```
MONGO_CONNECTION_STRING=
MONGO_DB=
```

Now when you start your project, mongo will connect and you can use it throughout your app, eg:

```js
const db = mongo.db()
const response = await db.collection("YOUR_COLLECTION").find()
```
