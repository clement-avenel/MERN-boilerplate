# MERN Boilerplate

## Installation
```node
npm install
```
## Setup
You have to create a .env file, with the following entries.
```node
USERNAME="XXXXX",
PASSWORD="XXXXXXXXXXXX",
HOST= "xxxxxxxxx.xxxxx.mongodb.net",
DB= "XXXXXXXX",
PROD_URL="https://xxxxxxx.com"
ACCESS_TOKEN_SECRET="XXXXXXXXX"
ACCESS_TOKEN_LIFE="24h"
```
## Run Server and Client
To run server and client concurrently on localhost, simply execute :
```node
npm run dev
```
## Only server
To only run the server on localhost, simply execute :
```node
nodemon index
```
## Test
```node
npm run test
```
