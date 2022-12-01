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

DOCKER_IMAGE_NAME=eu.gcr.io/moro-artifacts/skills-manager-api:${DOCKER_IMAGE_VERSION}
#cat $GCP_COMMON_SERVICE_ACCOUNT_SECRET | docker login -u _json_key --password-stdin https://eu.gcr.io

echo "Going to create a Docker image $DOCKER_IMAGE_NAME"
docker build $BUILD_PARAMS -t $DOCKER_IMAGE_NAME .

#docker push $DOCKER_IMAGE_WITH_TAG
