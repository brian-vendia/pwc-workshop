# pwc-workshop

This repository is being used to store artifacts for the 30-Jun-2021 hands-on workshop with PwC.  We will use [johnpapa/heroes-react](https://github.com/johnpapa/heroes-react) as inspiration to create and deploy a Vendia Share-backed, multi-party web application.

# Pre-requisites

* [Vendia Share CLI](https://vendia.net/docs/share/cli)

## Clone the Repository

In order to use the artifacts, you'll first need to clone the respository.

### Clone with SSH

```bash
git clone git@github.com:brian-vendia/pwc-workshop.git
```

### Clone with HTTPS

```bash
git clone https://github.com/brian-vendia/pwc-workshop.git
```

# Deploying the Example Uni

This example will create a Uni to store attributes regarding shipments.

If not already logged in to the share service do so by running [`share login`](https://vendia.net/docs/share/cli/commands/login):

```bash
share login
```

The `share uni create` command can be used to deploy our Uni.  You will need to copy the a sample `registration.json` file to `registration.json`.  There are two files to choose - one has a node configured to use a Cognito User Pool for authentication, the other uses API Key as the authentication mechanism.  Pick a unique `name` for your uni that begins with `test-` - by default all Unis share a common namespace so here is your chance to get creative.  Update the `userId` attribute of each node to reflect your Vendia Share email address.

```bash
cd uni_configuration
share uni create --config registration.json
```

The Uni will take approximately 5 minutes to deploy.  We can check on its status in the Vendia Share web application or with the `share` CLI.

**NOTE:** The name of your Uni will be different.  Adjust as appropriate.

```bash
share get --uni test-heroes-react
```
