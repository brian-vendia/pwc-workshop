# Milestone 1 - Create a Single Node Uni
In this section, we will deploy a new Uni called **test-heros-react**

## Explore the /uni_configuration directory
The /uni_configuration directory contains several pre-created files that will help us quickly create a new Uni.

* __schema.json__ - Contains the data model for this Uni, which defines two types of characters: Heros :) and Villians :(.
* __initial-state.json__ - Contains seed data for this Uni, which creates several characters for us to use in workshop
* __registration.singlenode.json__ - Contains cloud, region, and account information for this Uni

## Create the Uni
Now it's time to create a Uni based on the files from the previous section.

If not already logged in to the share service do so by running [`share login`](https://vendia.net/docs/share/cli/commands/login)

```bash
share login
```
  
The `share uni create` command creates the Uni.  For this step, we'll use the `registration.singlenode.json` file.  Pick a unique `name` for your Uni  that begins with `test-`.  By default, all Unis share a common namespace so here is your chance to get creative.

You will also want to update the `userId` attribute of the node to reflect your personal Vendia Share username (i.e. your email address) before creating the Uni.

```bash
cd uni_configuration
share uni create --config registration.singlenode.json
```

The Uni will take approximately 5 minutes to launch.  We can check on its status in the Vendia Share UI or with the `share` CLI.

```bash
share get --uni <name_of_your_uni>
```

**NOTE** <name_of_your_uni> should match the name from the `registration.singlenode.json` file.

Once the Uni is ready, explore its contents using the Vendia Share UI (or the GraphQL Client of your choice).

https://share.vendia.net/uni

Using the GraphQL Explorer, list all the Heroes.  These should match what you saw in `init-state.json`

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

Using the GraphQL Explorer, list all the Villains.  These should match what you saw in `init-state.json`

```bash

query {
    listVillians {
        Villians {
            description
            id
            name
            slug
            username
        }
    }
}

```

## Bonus Points - Create A Multi-Node, Multi-Region Uni
A multi-node, multi-region Uni can be created just as easily as a single-node Uni using the files from the previous section as a starting point.  Edit `registration.singlenode.json` to reference a different Uni name and an additional Node.  For fun, reference a different region (say `us-east-2`, `us-west-1`, or `us-west-2`).

```bash
{
    "name": "Node2",
    "userId": "you@domain.com",
    "region": "us-west-2"
}
```

Using the GraphQL Explorer from Node1, list all the Heroes.  These should match what you saw in `init-state.json`

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

Using the GraphQL Editor from Node1, add a new Hero.

```bash

mutation add($description:String,$name:String, $slug:String,$username:String) {
    addHero_async( input: {description:$description, name: $name, slug: $slug, username: $username}) {
        error
    }
}

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