# skills-manager

## Folders

- client - React app (FE)
- api - Spring boot app (BE)

## Docker
### Development
You can use docker for development.

1. Build api and client, you can find instruction for build inside README.md in `./api` and `./client`
2. run docker-compose with command `docker-compose -f docker-compose.dev.yaml up --build`.
It will create docker images based on ENVIRONMENT variables inside docker-compose and start them.
Config for docker build is in `./client/Dockerfile` for client and `./api/Dockerfile` for api

## Release instructions
For release you have to do following steps.

1. Merge your code into `master` branch
2. Merge will automatically trigger bamboo build which will build both api and client, bump version and push docker images into docker hub
Bamboo will only bump patch version. If you want to release new major or minor version you have to bump manually inside `client/package.json` file and `api/build.gradle` file.
If you don't want to bump version inside bamboo, you need to set false in `bumpVersion` variable inside Bamboo.
3. Contact admin and tell them which version they should deploy. You can find version in commit message (Bamboo will create new commit)
4. Main `docker-compose.yaml` file is already on server so admin will only change version of docker-image inside this file and the re-run docker compose
 	- `ssh ec2-user@3.126.111.17`
 	- `sudo su root`
 	- `docker-compose down`
 	- edit the docker file and change the api and client version to the latest
 	- `docker-compose -f docker-compose.yml up -d`

### How to connect to Docker database
- `ssh ec2-user@3.126.111.17`
- `sudo su root`
- `docker ps`
- `docker exec -it cvmorosystemscz_db_1 bash`
- `psql -U docker-moro -d skillsmanager`
- `psql \dt` and use standard SQL language

If you need help, contact: `jan.bartl@morosystems.cz` or `tomas.kubicek@morosystems.cz`

*Created by: MoroSystems s.r.o.*
