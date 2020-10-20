# Kubernetes Training 5
Oct 2020

So far, this repo just contains a simple express app to be used in a deployment. Really nothing special here...

# Training Agenda

1. Quick Overview of [Express App](./src/app.js)
1. A practical example
1. GitOps Intro
1. Helm Intro
1. First look at [eks-gitops](https://github.com/byubroadcasting/eks-gitops)

## Quick Overview of the express app

Literally want to spend less than 60 seconds on this. This repo holds the app we'll be deploying to the dev cluster. There's really nothing special here.

```bash
$ docker build --tag demo .
$ docker run --itd --name demo --rm --publish 8080:8080 demo:latest
```

## A Practical Example

I'll walk through a practical example where we'll deploy a web app to our dev cluster. I prefer to learn by doing, so rather than read through the following material, we'll reference the following sections as we come across new concepts in the example.

## GitOps Intro

What is GitOps?
> GitOps is a way of implementing Continuous Deployment for cloud native applications. It focuses on a developer-centric experience when operating infrastructure, by using tools developers are already familiar with, including Git and Continuous Deployment tools ([gitops.tech](https://www.gitops.tech/)).

In other words, we describe the state of our K8s cluster (e.g., the "cloud native application") in a Git repository, then GitOps uses automated processes to make the cluster match the desired state described in the repository.

GitOps is more like a *philosophy* -- it's a description of how a GitOps implementation should behave.

See [Why should I use GitOps?](https://www.gitops.tech/#why-should-i-use-gitops)

### Flux

[Flux](https://www.weave.works/oss/flux/) is a [Kubernetes operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) you install on a cluster to implement GitOps.

> A Kubernetes *Operator* lets you extend the cluster's behavior without modifying the code of Kubernetes itself ([kubernetes.io/docs/concepts/extend-kubernetes/operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator)).

> Flux is the operator that makes GitOps happen in your cluster. It ensures that the cluster config matches the one in git and automates your deployments ([weave.works/oss/flux](https://www.weave.works/oss/flux/)).

## Helm Intro

[Helm](https://helm.sh/) is the "package manager for Kubernetes". Why does Kubernetes need a package manager, you might ask? A good example is installing flux. Rather than writing a bunch of manifest files to declare a deployment, services, service accounts, roles, cluster roles, role bindings, cluster role bindings, etc., we can simply use helm to install the flux operator.

```bash
$ helm repo add fluxcd https://charts.fluxcd.io
"fluxcd" has been added to your repositories
$ helm install flux fluxcd/flux \
  --set git.url="git@$GIT_HOST:$GIT_USER/$GIT_REPO" \
  --set git.path="k8s/common\,k8s/$CLUSTER_NAME" \
  --namespace flux
```

### Charts

With Helm, you package your manifest files together into a [Chart](https://helm.sh/docs/topics/charts/). A Chart is simply a collection of files laid out in a specific directory structure. Click the link to see more.

### Templates

Helm comes with a templating language, making it easy to create re-usable charts. See [Chart Template Guide: Getting Started](https://helm.sh/docs/chart_template_guide/getting_started/).

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

### Helm Operator

> The Helm Operator is a Kubernetes operator, allowing one to declaratively manage Helm chart releases. Combined with Flux this can be utilized to automate releases in a GitOps manner.
>
> The desired state of a Helm release is described through a Kubernetes Custom Resource named HelmRelease. Based on the creation, mutation or removal of a HelmRelease resource in the cluster, Helm actions are performed by the operator ([source](https://github.com/fluxcd/helm-operator/tree/release/1.2.x)).

A [*HelmRelease*](https://docs.fluxcd.io/projects/helm-operator/en/1.0.0-rc9/references/helmrelease-custom-resource.html) is a CRD (*Custom Resource Definition*). In Kubernetes, A [Custom Resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) is "an extension of the Kubernetes API that is not necessarily available in a default Kubernetes installation".

**A side note on annotations**: The HelmRelease objects in [eks-gitops](https://github.com/byubroadcasting/eks-gitops) has an `annotations` block in the metadata section. Annotations are used pretty widely in Kubernetes and act like decorators in OO. Annotations "attach arbitrary non-identifying metadata to objects". Annotations can be used to create a desired side-effect.
