# Kubernetes Training 5
Oct 2020

So far, this repo just contains a simple express app to be used in a deployment. Really nothing special here...

# Training Agenda

1. Quick Overview of [Express App](./src/app.js)
1. GitOps Intro
1. Helm Intro
1. First look at [eks-gitops](https://github.com/byubroadcasting/eks-gitops)
1. Putting it all together with a practical example

## Quick Overview of the express app

This repo holds the app we'll be deploying to the dev cluster. There's really nothing special here.

```bash
$ docker build --tag demo .
$ docker run --itd --name demo --rm --publish 8080:8080 demo:latest
```

## GitOps Intro

What is GitOps?
> GitOps is a way of implementing Continuous Deployment for cloud native applications. It focuses on a developer-centric experience when operating infrastructure, by using tools developers are already familiar with, including Git and Continuous Deployment tools. ([https://www.gitops.tech/](https://www.gitops.tech/))

In other words, we describe the state of our K8s cluster (e.g., the "cloud native application") in a Git repository, then GitOps uses automated processes to make the cluster match the desired state described in the repository.

GitOps is more like a *philosophy* -- it's a description of how a GitOps implementation should behave.

See [Why should I use GitOps?](https://www.gitops.tech/#why-should-i-use-gitops)

### Flux

[Flux](https://www.weave.works/oss/flux/) is a [Kubernetes operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) you install on a cluster to implement GitOps.

> A Kubernetes *Operator* lets you extend the cluster's behavior without modifying the code of Kubernetes itself. [(kubernetes.io/docs/concepts/extend-kubernetes/operator)](https://kubernetes.io/docs/concepts/extend-kubernetes/operator)

> Flux is the operator that makes GitOps happen in your cluster. It ensures that the cluster config matches the one in git and automates your deployments. [weave.works/oss/flux](https://www.weave.works/oss/flux/)



## Helm Intro

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

## A Practical Example
