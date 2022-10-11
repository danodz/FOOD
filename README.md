# Setup

## env
.env with the following fields (mongodb and opencage account required. The two secrets fields can be whatever you want, kinda follows the same safety rules as passwords)  
dbName=""  
MONGO_URI=""  
secret=""  
cookieSecret=""  
OPENCAGE_API_KEY=""  

## server
cd server  
node initData.js  
yarn install  

copy server/data/nutrients.json to client/data/  

## client
cd client  
yarn install  