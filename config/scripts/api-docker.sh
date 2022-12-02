#!/bin/bash

echo "Creating API docker image..."

chmod +x api/gradlew

cd api
GRADLE_USER_HOME="$(pwd)/.gradle"
export GRADLE_USER_HOME
apk add --update docker

DOCKER_IMAGE_VERSION=$(./gradlew properties | grep ^version | sed 's/version: //g')
JAR=./build/libs/skills-manager-api-${DOCKER_IMAGE_VERSION}.jar

BUILD_PARAMS="--no-cache --build-arg JAR_FILE=$JAR"
DOCKER_IMAGE_NAME=${DOCKER_IMAGE_PREFIX}/skills-manager:api-${DOCKER_IMAGE_VERSION}

base64 $GCP_SERVICE_ACCOUNT_SECRET > docker-key-base64.json

cat docker-key-base64.json | docker login -u _json_key_base64 --password-stdin europe-west3-docker.pkg.dev

echo "Going to create a Docker image $DOCKER_IMAGE_NAME"
docker build $BUILD_PARAMS -t $DOCKER_IMAGE_NAME .

docker push $DOCKER_IMAGE_NAME
