#!/bin/bash

# install node modules to the parent directory
npm install

# install node modules to the client
cd client
npm install

# install node modules to the server
cd ../server
npm install

# build the client
cd ../
npm run build