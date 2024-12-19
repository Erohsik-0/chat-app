npm create vite@latest .

npm i

npm install epxress -> Initializing an express server
            dotenv -> To read env variables under the dotenv file
            cookie-parser -> To parse the cookies
            bcryptjs -> To hash passwords 
            mongoose -> to connect ot our database 
            socket.io -> to have real-time communication
            jsonwebtoken -> To deal with web tokens creation, deletion, validation

nodemon -> to speed up the node.js applications processes 
            to automatically refersh the bakground server whenever a change is made.

postman -> to analyse and verify api requests 

connecting to db using connection string and creating models using mongoose

using postman api verified signup page is fetching and posting details correctly 


Bcrypt -> using salt of 10 to hash password strongly

## If Error in signup controller E11000 duplicate key error collection: chat-app.users index: username_1 dup key: { username: null }

### Drop collection and create new -> Just works fine 