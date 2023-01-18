# Summary
Back when I was studying nutrition, I really disliked the software we used. So I wrote [fcenSearch](https://danodz.github.io/fcen/) as a first draft, it worked well as a searching tool, but I knew I needed to do more.  
The final project for concordia's Diploma in Full-Stack Web Development was the perfect opportunity to get started on the next step. So I worked on this for a little less than two weeks, still a lot to be done and there are things already done with which I am not satisfied (thanks school deadlines and requirements).

This project aims to calculate nutrition facts as well as the cost of foods and groups of foods (such as recipes and menus). It's all been abstracted as a single data type: food.
Foods can be compared with each other and older version of themselves (for instance, if you want to evaluate how the cost changed over time).  
Foods are created by users and have associated providers with their respective costs. For now, a user can specify his location allowing others to search for foods create by nearby users (so you can get costs more relevant to your region), enventually I intend to move the location to providers instead of users.

# Setup

You need an accessible mongodb instance.  
You need to create an opencage account. It's the api used for geocoding.
<https://opencagedata.com/>

## env
.env file in the server's root folder with the following fields (opencage account required. The two secrets fields can be whatever you want, kinda follows the same safety rules as passwords)  
dbName=""  
MONGO_URI=""  
secret=""  
cookieSecret=""  
OPENCAGE_API_KEY=""  

## server
cd server  
yarn install  
node initData.js  
yarn start

## client
cd client  
yarn install  
yarn start