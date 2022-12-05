#!/bin/bash

echo "Creating Client docker image..."

chmod +x api/gradlew

cd client
GRADLE_USER_HOME="$(pwd)/.gradle"
export GRADLE_USER_HOME
apk add --update docker npm

DOCKER_IMAGE_VERSION=$(node -p "require('./package.json').version")
DOCKER_IMAGE_NAME=${DOCKER_IMAGE_PREFIX}/skills-manager:client-${DOCKER_IMAGE_VERSION}

base64 $GCP_SERVICE_ACCOUNT_SECRET > docker-key-base64.json

cat docker-key-base64.json | docker login -u _json_key_base64 --password-stdin europe-west3-docker.pkg.dev

echo "Going to create a Docker image $DOCKER_IMAGE_NAME"

docker build -t $DOCKER_IMAGE_NAME .
docker push $DOCKER_IMAGE_NAME
