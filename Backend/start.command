#!/bin/bash

# Move into the folder where this script is located
cd "$(dirname "$0")"

echo "Inside backend folder: $(pwd)"

echo "Installing missing packages..."
npm install

echo "Starting backend server..."
npm start

echo ""
echo "Server stopped. Press ENTER to close this window."
read