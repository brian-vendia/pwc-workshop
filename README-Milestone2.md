# Milestone 2 - Integrate a Web Application
In this section, we will connect a web application to the existing single-node Uni we created in Milestone 1.

## Explore the /client_app directory
The /client_app directory contains a pre-crated React web application that will help us quickly integrate a user-facing application with a Uni

* __package.json__ - Contains the configuration for the web application, including a series of scripts that can be executed from the command line.
* __gql__ - A set of GraphQL operations (Queries and Mutations) that can be used to create/read/update/delete/list characters

## Install and Run the Web Application
* See the  [Detailed Instruction](./client_app/README.md)

## Bonus Points - Integrate with the Multi-Node, Multi-Region Uni
The  multi-node, multi-region Uni created in the previous section can also be used by this web application.  To make use of the Web Application's dynamic configuration feature:

*   First, rename `registration.json` to `registration.json.old`
*   Next, rename `registration.multinode.json` to `registration.json`
        
    >   Note:  It may be necessary to stop the application with ctrl+c if it is already running before it can be started again.

*   Once the new `registration.json` file has been created, you can start the web application from within the `/client_app` directory.

```bash

npm run start

```

Visit the new Multi-node Uni at the [Uni Dashboard](https://share.vendia.net). Using the GraphQL Editor __from Node2__, list all the Heroes.  This list should include the Hero added from Node1 in the previous step.

>   Note: If you are not certain of the Uni's name, you can find it in the registration.json file.

```bash

query listHerosQuery {
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

Add a Hero through the Web Application (via Node1) and then verify through the GraphQL Explorer (via Node2) that the Hero is included in the list.
