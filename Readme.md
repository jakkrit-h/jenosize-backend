## Installation
1. create .env file
2. npm install - node version 20+
3. npm run dev

## EXAMPLE API

GET: http://localhost:3000/jenosize?search=ตี๋น้อย Require Header x-api-key

GET: http://localhost:3000/jenosize/gamexo?slots[]=1&slots[]=0&slots[]=0&slots[]=0&slots[]=0&slots[]=0&slots[]=0&slots[]=0&slots[]=0  Data type 1|2|0 [9]

GET: http://localhost:3000/jenosize/game24?numbers[]=9&numbers[]=4&numbers[]=5&numbers[]=8

## ENV

APP_API_KEY="VvCrrP2WRBvEp9jkMf76vJWUpGFEX6fh" - Fake App Apikey

GOOGLE_API_KEY="YOUR_API_KEY_FOR_PLACES_API"

GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL= 'YOUR_FIREBASE_CREDENTIALS_CLIENT_EMAIL'

GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY='YOUR_FIREBASE_CREDENTIALS_PRIVATE_KEY'

GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID='YOUR_FIREBASE_CREDENTIALS_PROJECT_ID'
