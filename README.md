# MongoDB Layer

A simple way to use mongo in our project. Just add your db credentials and you can use the connection from anywhere in the app.

## Features

- Connects on load, then shares the same connection everywhere
- Server closed handling (exits the app to force a restart)

## Setup

1. Add your db credentials into a .env file as DB_CREDENTIALS
2. From anywehre call `mongo()` to get the db connection
