const api = require("./shareAPi");
const registration = require("../../uni_configuration/registration.json");
const schema = require("../../uni_configuration/schema.json");
const initState = require("../../uni_configuration/initial-state.json");
const ora = require("ora");
const stringifyObject = require('stringify-object');
const fs=require("fs");
const envFile="share_env.json";
const sleep=function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const post=async function(query,creds){
    data = { query };
    return await api.signRequest({
      credentials: {
        accessKeyId: creds.accessKeyId,
        secretAccessKey: creds.secretAccessKey,
        sessionToken: creds.sessionToken,
      },
      host: "share.services.vendia.net",
      region: "us-east-1",
      method: "POST",
      baseURL: "https://share.services.vendia.net",
      body: data,
    })("/share", { body: JSON.stringify(data) });
};

const createUniQuery = `
mutation CreateUni{
    register(input:{
        name: "${registration.name}"
        schema: "${JSON.stringify(schema).replaceAll('"','\\"')}"
        sku: SHARE
        initState: "${JSON.stringify(initState).replaceAll('"','\\"')}"
        nodes: ${stringifyObject(registration. nodes, {
          indent: '  ',
          singleQuotes: false
      })}
      }
      ) 
}
`;

const getUniQuery = `
query getStatus{
    getUni(uni: "${registration.name}"){
        name
        status
        nodes {
          resources {
            graphqlApi {
              apiKey
              httpsUrl
              websocketUrl
            }
          }
          vendiaAccount {
            accountId
          }
        }
    }
}
`;

const VENDIA_SHARE_USERNAME = process.env.VENDIA_SHARE_USERNAME || "";
const VENDIA_SHARE_PASSWORD = process.env.VENDIA_SHARE_PASSWORD || "";
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

if (VENDIA_SHARE_PASSWORD == "" || VENDIA_SHARE_PASSWORD == "") {
  console.error(
    "Please ensure VENDIA_SHARE_PASSWORD and VENDIA_SHARE_USERNAME environment variables are set and try again."
  );
  process.exit(2);
}

let data = "";
const spinner = ora("Logging in to Vendia Share").start();

//login to share
api
  .login(VENDIA_SHARE_USERNAME, VENDIA_SHARE_PASSWORD, AWS_REGION)
  .then(async (creds) => {
    spinner.succeed("Logged in to share").start("Checking if Uni Exists");
    //Check if uni exists
    let statusResponse = await post(getUniQuery,creds);
    let statusValue="";
    let gqlAPI,gqlKey,gqlWSUrl;
    if (statusResponse.data.data == null) {
      spinner.succeed("Uni does not exist").start("Registering new Uni "+registration.name);
      //create new uni
      //  console.debug(createUniQuery)
      let createResponse = await post(createUniQuery,creds);
      if(createResponse.data.errors){
        if(createResponse.data.errors.length>0){
        throw createResponse.data.errors;
        }
      }
      else{
        statusResponse = await post(getUniQuery,creds);
        statusValue=statusResponse.data.data.getUni.status;
        spinner.start("Registered "+registration.name+". Waiting for Node(s) to become available");
        while(statusValue=="PENDING_REGISTRATION"){
          await sleep(20000);
          statusResponse = await post(getUniQuery,creds);
          statusValue=statusResponse.data.data.getUni.status;
        }
        if(statusValue=="RUNNING"){
          spinner.succeed("Uni is Running");
        }
        else{
          throw "Uni entered the "+statusValue+" state";
        }
        
      }

    } else {
      spinner.warn("Uni already exists. If you desire a new Uni, delete the uni_configuration/registration.json file.").succeed("Uni already Registered"); 
    }
    
    //update config
    spinner.start("Updating Configuration");
    statusResponse = await post(getUniQuery,creds);
    gqlAPI=statusResponse.data.data.getUni.nodes[0].resources.graphqlApi.httpsUrl;
    gqlKey=statusResponse.data.data.getUni.nodes[0].resources.graphqlApi.apiKey;
    gqlWSUrl=statusResponse.data.data.getUni.nodes[0].resources.graphqlApi.websocketUrl;
    fs.writeFileSync(envFile, Buffer.from(JSON.stringify({gqlAPI,gqlKey,gqlWSUrl})));

    spinner.succeed("Updated GQL Endpoint "+gqlAPI);
  })
  .catch((err) => {
    console.error("error");
    console.error(err.data ? JSON.stringify(err.data) : JSON.stringify(err));
    spinner.fail("Error occurred. See console output for details.");
  });
