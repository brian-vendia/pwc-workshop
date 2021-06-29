# Milestone 4 - Collaborate on a Shared Uni
In this section, you will collaborate on a shared Uni.

## Collaborate Using the GraphQL Explorer

Using the GraphQL Explorer, each Participant should add a new Hero or Villain to the shared Uni created in the previous Milestone.

```bash

mutation addHero($description:String,$name:String, $slug:String,$username:String) {
    addHero_async( input: {description:$description, name: $name, slug: $slug, username: $username}) {
        error
    }
}

```

```bash

mutation addVillain($description:String,$name:String, $slug:String,$username:String) {
    addVillian_async( input: {description:$description, name: $name, slug: $slug, username: $username}) {
        error
    }
}

```

## Collaborate Using the Web Application

Following the sames steps as in [Milestone 2](./README-Milestone2.md), connect the web application to your Node within the shared Uni.

Once the web application is successfully connected, create, update, or delete a Hero or Villain. Tell your collaborating participant to confirm your changes are visible through their web application as well.

_Note: The web application is basic so make sure to refresh the application to see the updates.  We will not explore the WSS interfaces in this Workshop but they would be best suited for real-time, user-facing updates._

## Event-Driven Notifications
Get the current settings for your node in the shared Uni  
```bash

share node get --uni <name_of_your_Uni> --node <name_of_your_Node>

```  

Add a setting to the same node in the network to send block report emails  

```bash

share node update --uni <name_of_your_Uni> --node <name_of_your_Node> --config '{"blockReportEmails":["you@domain.com"]}' --force

```
  
Confirm the setting was successfully applied  
```bash

share node get --uni <name_of_your_Uni> --node <name_of_your_Node>

```  

Wait for an initial email from AWS confirming you'd like to subscribe to the SNS topic.  If you don't confirm your subscription, you won't receive notification emails.  It may take several minutes for the AWS wiring to take effect. 

Make a change to the Uni using either the GraphQL Explorer or the web application to generate a new block, and a corresponding email  

Wait for the emails to see how easily an event-driven, multi-node, multi-region application can be constructed with __Vendia Share__!
