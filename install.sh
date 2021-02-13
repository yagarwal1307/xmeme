#INSTALL MONGODB

# Import the public key used by the package management system
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

# Add sources
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

#Reloading local package database
sudo apt update

#Install the MongoDB packages
sudo apt install -y mongodb-org

#Starting and verifying the service
sudo systemctl start mongod
sudo systemctl status mongod

#Enable the service start on every reboot
sudo systemctl enable mongod

###################################################################################################################################

#INSTALLING NODEJS

#Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

#Load nvm without restarting terminal
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

#Install nodejs
nvm install node

#Testing node and nvm are installed and running
node -v
nvm -v

#Check if git is installed
git --version