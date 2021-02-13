#Load nvm without restarting terminal
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#Activate nvm
. ~/.nvm/nvm.sh

#Changing to server directory
cd ./backend

#Installing dependencies
npm install

#Starting server
npm start