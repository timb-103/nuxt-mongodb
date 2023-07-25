# Nuxt 3 MongoDB Layer

A simple way to use mongoDB in your Nuxt 3 project.

## Usage

Install the layer:

```sh
npm i -D nuxt-mongodb
```

Add the layer in the `extends` array in `nuxt.config.ts`:

```js
export default defineNuxtConfig({
  extends: ["nuxt-mongodb"],
})
```

Add your mongo connection string and main database name in your `.env` file:

```
MONGO_CONNECTION_STRING=
MONGO_DB=
```

When you start your project, mongo will connect and you can use it anywhere, eg:

```js
const db = mongo.db()
const response = await db.collection("YOUR_COLLECTION").find()
```
