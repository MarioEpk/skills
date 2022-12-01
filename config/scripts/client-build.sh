#!/bin/bash

echo "Compiling the frontend code..."

[ -e .env ] && rm .env
echo "REACT_APP_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env
echo "REACT_APP_API_URL=${CLIENT_API_URL}" >> .env

apt install -y git
cd client
npm install
npm run build:ui

