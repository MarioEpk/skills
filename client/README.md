# skills-manager-client

## Build
Just run `yarn build`. It will create new folder `dist`.
This folder can be used for docker image build.

## Env file
Create `.env` based on `.env.example`

## Local development
### Docker
You can use docker (instructions are specified in `skills-manager/README.md`)

### Local
For local development you need database running on port `5432` and you have to named it `skillsmanager`.
You can find these values and more inside properties file.
#### Hosts
Because of google authorization you need to edit your `hosts` file.
Add - `127.0.0.1 skills-manager.com`



