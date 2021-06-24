//UNI
console.log("");

try{
    const registration=require(__dirname+'/../../uni_configuration/registration.json');
    console.info("Uni Info:");
    console.info("   Name: "+registration.name);
    console.info("   Nodes:");
    registration.nodes.map((node)=>{
        console.info("      Name: "+node.name);
        console.info("      UserId: "+node.userId);
        console.info("      Region: "+node.region);

    })
}
catch{
    console.info("Uni registration file does not exist. Run 'npm run deploy' to deploy a Uni");
}
console.log("");
//API
const envFile=require(__dirname+"/../share_env.json");
console.info("API Information:");
console.info("   GraphQL Endpoint: "+envFile.gqlAPI);
console.info("   GraphQL WebSocket Endpoint: "+envFile.gqlWSUrl);
console.info("   GraphQL Key: "+envFile.gqlKey);
console.log("");
