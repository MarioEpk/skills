#!/bin/bash

echo "Creating Client docker image..."

chmod +x api/gradlew

cd client
GRADLE_USER_HOME="$(pwd)/.gradle"
export GRADLE_USER_HOME
apk add --update docker npm

DOCKER_IMAGE_VERSION=$(node -p "require('./package.json').version")
DOCKER_IMAGE_NAME=eu.gcr.io/moro-artifacts/skills-manager-client:${DOCKER_IMAGE_VERSION}
#cat $GCP_COMMON_SERVICE_ACCOUNT_SECRET | docker login -u _json_key --password-stdin https://eu.gcr.io

echo "Going to create a Docker image $DOCKER_IMAGE_NAME"

docker build -t $DOCKER_IMAGE_NAME .
#docker push $DOCKER_IMAGE_WITH_TAG
