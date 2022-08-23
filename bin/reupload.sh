#
#
# This script makes build of MoroCV app and starts it in Docker container
#
#

echo "\n--- Building MoroCV client part ---\n"
#
cd ../client;
yarn build;


echo "\n--- Building MoroCV api part ---\n"
#
cd ../api;
./gradlew build


echo "\n--- Starting MoroCV app... ---\n"
#
cd ..;
docker-compose -f docker-compose.dev.yaml up --build;