#Activate nvm
. ~/.nvm/nvm.sh

#Changing to server directory
cd ./backend

#Create the .env file
cp .env.example .env

#Installing dependencies
npm install

#Starting server
npm run-script dev