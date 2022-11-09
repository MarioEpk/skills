# skills-manager-client

## Build
Just run `yarn install` and `yarn build`. It will create new folder `dist`.
This folder can be used for docker image build.

#linux
If `yarn start` failed with error `ERR_OSSL_EVP_UNSUPPORTED`,
execute `export NODE_OPTIONS=--openssl-legacy-provider` before `yarn start`

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



