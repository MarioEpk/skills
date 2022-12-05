#!/bin/bash

echo "Building api..."

cd api
chmod +x ./gradlew
./gradlew --build-cache --gradle-user-home .gradle/ build

