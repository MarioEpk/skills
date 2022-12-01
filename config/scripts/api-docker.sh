#!/bin/bash

echo "Creating API docker image..."

chmod +x api/gradlew

IMAGE_TAG="$CI_COMMIT_REF_SLUG-$CI_COMMIT_SHORT_SHA"
DOCKER_IMAGE_WITH_TAG=${DOCKER_IMAGE_PREFIX}${IMAGE_TAG}

cd api
GRADLE_USER_HOME="$(pwd)/.gradle"
export GRADLE_USER_HOME
apk add --update docker
cat $GCP_COMMON_SERVICE_ACCOUNT_SECRET | docker login -u _json_key --password-stdin https://eu.gcr.io

echo "Going to create a Docker image $DOCKER_IMAGE_WITH_TAG"

gradle bootBuildImage --imageName=$DOCKER_IMAGE_WITH_TAG
docker push $DOCKER_IMAGE_WITH_TAG
