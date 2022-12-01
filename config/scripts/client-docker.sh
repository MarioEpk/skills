#!/bin/bash

echo "Creating CLIENT docker image..."

chmod +x client/gradlew

cd client
GRADLE_USER_HOME="$(pwd)/.gradle"
export GRADLE_USER_HOME
apk add --update docker

echo "${DOCKER_HUB_PASSWORD}" | docker login --username "${DOCKER_HUB_USER}" --password-stdin
set -x

VERSION=$(node -p "require('./package.json').version")

DOCKER_IMAGE_WITH_TAG=morodocker/private:skills-manager-client-$VERSION .

echo "Going to create a Docker image $DOCKER_IMAGE_WITH_TAG"

gradle bootBuildImage --imageName=$DOCKER_IMAGE_WITH_TAG
docker push $DOCKER_IMAGE_WITH_TAG
