# MongoDB Layer

A simple way to use mongo in our project. Just add your db credentials and you can use the connection from anywhere in the app.

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



Now when you start your project, mongo will connect and you can use it throught your app, eg: 

```js
const db = mongo.db()
const response = await db.collection('YOUR_COLLECTION').find()
```



