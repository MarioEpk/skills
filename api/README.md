# skills-manager-api

## Build
Just run `./gradlew build`. It will create new folder `build`.
This folder can be used for docker image build.

## Application.properties file
You can find one root `application.properties` file and two environment specific - 
`application-dev.properties` and `application-docker.properties`.

Variable `spring.profiles.active` inside root property file decide which file will be used (dev or docker, dev is default).

## Local development
### docker
You can use docker (instructions are specified in `skills-manager/README.md`)

### Local
For local development you need database running on port `5432` and you have to named it `skillsmanager`.
You can find these values and more inside properties file.
