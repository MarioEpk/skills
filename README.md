# skills-manager

## Folders

- client - React app (FE)
- api - Spring boot app (BE)

## Building the application
1. Build api and client, you can find instruction for build inside README.md in `./api` and `./client`

## Building Docker image
**The following steps are automated using GitLab CI/CD pipelines.**

1. build Docker image
  ```shell
  docker build -t europe-west3-docker.pkg.dev/moro-artifacts/morosystems-docker/skills-manager:api-<version> .
  docker build -t europe-west3-docker.pkg.dev/moro-artifacts/morosystems-docker/skills-manager:client-<version> .
  ```
2. authenticate / Docker login
  ```shell
  cat moro-artifacts-c47715586dc0-morosystems-admin.json | docker login -u _json_key --password-stdin europe-west3-docker.pkg.dev
  ```
* [moro-artifacts-c47715586dc0-morosystems-admin.json](https://morosystems.atlassian.net/wiki/spaces/MSIT/pages/3613327860/Priv+tn+kl+e+k+servisn+m+t+m+Google+Artifact+Registry)

3. push Docker image to Google Artifact Registry
  ```shell
  docker push europe-west3-docker.pkg.dev/moro-artifacts/morosystems-docker/skills-manager:api-<version>
  docker push europe-west3-docker.pkg.dev/moro-artifacts/morosystems-docker/skills-manager:client-<version>
  ```

### Development
You can use Docker for development.
1. run docker-compose with command `docker-compose -f docker-compose.dev.yaml up --build`.
It will create docker images based on ENVIRONMENT variables inside docker-compose and start them.
Config for docker build is in `./client/Dockerfile` for client and `./api/Dockerfile` for api

## Deploying to GCP
**The following steps are automated using GitLab CI/CD pipelines.** There is a manual stage for deploy.

Application is designed to run in Kubernetes cluster and manually deployed using GitLab CI/CD when code is pushed to the `master` branch.

### Prerequisites

* installed [gcloud](https://cloud.google.com/sdk/docs/install)
* installed [kubectl](https://wiki.morosystems.cz/pages/viewpage.action?pageId=222495585)
   * setup the current GCP project to point to the PROD project: `gcloud config set project morosystems-common`
   * add credentials to kubectl: `gcloud container clusters get-credentials master --region europe-west3-a`
* make sure there are following files with service accounts keys (they are gitignored):
   * `config/scripts/gcloud-service-account-key-common.json` containing service account key for the `morosystems-common` GCP project

### Deploy
1. inform the team that application will be unavailable for several minutes
2. switch to the `master` branch and pull latest commits
3. run the script `config/scripts/deploy.sh` - refer to the initial comment in the file for description of the steps executed by the script
    ```shell
   ./deploy.sh
    ```
   the app should be built and deployed after cca 4 - 8 minutes (the first run will be longer than that due to downloading Docker images)
4. inform the team that the deploy is finished


## How to connect to the database
1. connect to database Kubernetes pod using `kubectl` command
    ```shell
    kubectl exec -it skills-manager-postgres-0 -- psql -d skillsmanager_db -U docker-moro
    ```



## Need help?
If you need help with the code, contact: `jan.bartl@morosystems.cz` or `tomas.kubicek@morosystems.cz`

If you need help with the infrastructure or deployment, contact: `michal.sipek@morosystems.cz` 

*Created by: MoroSystems s.r.o.*
