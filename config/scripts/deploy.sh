#!/bin/sh

echo "Deploying the new backend Docker image to the Kubernetes cluster..."

# https://console.cloud.google.com/iam-admin/serviceaccounts/details/111121289526666595400/keys?project=morosystems-common
cat $GCP_PROD_SERVICE_ACCOUNT_SECRET > "$(pwd)/gcloud-service-account-key-prod.json"

gcloud auth activate-service-account --key-file=$(pwd)/gcloud-service-account-key-prod.json
cat $(pwd)/gcloud-service-account-key-prod.json
gcloud config set project morosystems-common
gcloud container clusters get-credentials master --region europe-west3-a
kubectl kustomize ../kubernetes/api/ | kubectl apply -f -
kubectl kustomize ../kubernetes/client/ | kubectl apply -f -
kubectl kustomize ../kubernetes/postgres/ | kubectl apply -f -
