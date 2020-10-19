# Kubernetes Training 5
Oct 2020

So far, this repo just contains a simple express app to be used in a deployment. Really nothing special here...

# Training Agenda

1. Quick Overview of [Express App](./src/app.js)
1. First Look at [eks-gitops](https://github.com/byubroadcasting/eks-gitops)
1. GitOps Intro
1. Helm Intro
1. Putting it all together with a practical example

## Quick Overview of the express app

This repo holds the app we'll be deploying to the dev cluster. There's really nothing special here.

```bash
$ docker build --tag demo .
$ docker run --itd --name demo --rm --publish 8080:8080 demo:latest
```

## First Look at [eks-gitops](https://github.com/byubroadcasting/eks-gitops)

There are other top-level folders in the project, but these are the most important:
```text
.
├── charts
│   └── demo
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates
│           ├── _helpers.tpl
│           ├── aws-cron.yaml
│           ├── deployment.yaml
│           ├── hpa.yaml
│           └── service.yaml
└── k8s
    ├── common   # k8s manifest files common to all clusters (e.g., k8s-dashboard)
    │   ├── cluster-autoscaler-autodiscover.yaml
    │   └── kubernetes-dashboard
    │       ├── kubernetes-dashboard.yaml
    │       └── metrics-server.yaml
    ├── dev      # dev cluster manifest files
    │   └── demo.yaml
    ├── stage    # stage cluster manifest files
    │   └── demo.yaml
    └── prod     # prod cluster manifest files
        └── demo.yaml
```

## GitOps Intro

## Helm Intro

## A Practical Example
