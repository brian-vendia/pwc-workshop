# Milestone 2 - Integrate a Web Application
In this section, we will connect a web application to an existing Uni

## Explore the /client_app directory
The /client_app directory contains a pre-crated React web application that will help us quickly integrate a user-facing application with a Uni

* __package.json__ - Contains the configuration for the web application, including a series of scripts that can be executed from the command line.
* __gql__ - A set of GraphQL operations (Queries and Mutations) that can be used to create/read/update/delete/list characters

## Modify the Configuration
Now it's time to integrate with the Uni from the previous section.

We can get the GraphQL configuration from the Vendia Share UI or with the `share` CLI.

```bash

share get --uni <name_of_your_uni>

```

Modify the `share_env.json` file to reference the correct GraphQL endpoint and API Key.

Once the modifications have been made, you can start the web application from within the `/client_app` directory 

```bash

npm run start

```

## Bonus Points - Integrate with the Multi-Node, Multi-Region Uni
The  multi-node, multi-region Uni created in the previous section can also be used by this web application. 

We can get the GraphQL configuration from the Vendia Share UI or with the `share` CLI.

```bash

share get --uni <name_of_your_uni>

```

Remember to stop your previously running web application using Ctrl-C from the window in which you started the application in the previous section

Modify the `share_env.json` file to reference the correct GraphQL endpoint and API Key for Node1 of your multi-node Uni.

Once the modifications have been made, you can start the web application from within the `/client_app` directory 

```bash

npm run start

```

Using the GraphQL Editor __from Node2__, list all the Heroes.  This list should include the Hero added from Node1 in the previous step.

```bash

query {
    listHeros {
        Heros {
            description
            id
            name
            slug
            username
        }
    }
}

```

Add a Hero through the Web Application (via Node1) and then verify through the GraphQL Explorer (via Node2) that the Hero is now included in the list.
