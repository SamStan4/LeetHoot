#!/usr/bin/env bash

backend_path="./../server"
frontend_path="./../client"
common_path="./../common"

backend_env_path="./../server/.env"
frontend_env_path="./../client/.env"

backend_env_contents="\
PORT=                # This can be any port you want the API server to run on
DB_HOST=             # The IP address of the Postgres server
DB_PORT=             # The port that Postgres is running on
DB_NAME=             # The name of the database you set up
DB_USER=             # The username to use to connect to Postgres
DB_PASSWORD=         # The password to use to connect to Postgres\
"

frontend_env_contents="\
BACKEND=   # URL to the backend server\
"

if ping -c 1 8.8.8.8 &>/dev/null; then
    echo "Internet connection is active."
else
    echo "No internet connection."
    exit 1
fi

echo "checking for .env file in /backend..."

if [ -f "$backend_env_path" ]; then
	echo "...found"
else
	echo "...not found, creating fie /backend/.env, make sure to add details"
	touch "$backend_env_path"
	echo "$backend_env_contents" > "$backend_env_path"
fi

echo "checking for .env file in /client..."

if [ -f "$frontend_env_path" ]; then
	echo "...found"
else
	echo "...not found, creating file /client/.env, make sure to add details"
	touch "$frontend_env_path"
	echo "$frontend_env_contents" > "$frontend_env_path"
fi

install_dependencies() {
	local path="$1"
	echo "installing dependencies in $path..."
	if (cd "$path" && npm install); then
		echo "...succesfully installed dependencies in $path"
	else
		echo "...failed to install dependencies in $path"
	fi
}

install_dependencies "$backend_path"
install_dependencies "$common_path"
install_dependencies "$frontend_path"