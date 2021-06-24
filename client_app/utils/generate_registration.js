const fs = require("fs");
let registration = require(__dirname+"/../uni/registration.template.json");
const registrationFile = __dirname+"/../../uni_configuration/registration.json";
const ora = require('ora');


const spinner = ora('Building Uni Registration Data').start();

const randomName = function () {
  return "test-workshop-" + Math.floor(Math.random() * 16777215).toString(16);
};

let uni_name = process.env.VENDIA_UNI_NAME || randomName() + ".unis.vendia.net";

registration.name = uni_name;
registration.userId = registration.nodes.push({
  name: "node-" + randomName(),
  userId: process.env.VENDIA_SHARE_USERNAME || "replace@with.email",
  region: process.env.AWS_REGION || "us-east-1"
});

if (fs.existsSync(registrationFile)) {
 const msg=
    `Registration file ${registrationFile} already exists. A new Uni will not be created. Delete the existing file if you wish to deploy a new Uni. `
 spinner.warn(msg);
} else {
    spinner.succeed("Registration File Created.");
  fs.writeFileSync(registrationFile, Buffer.from(JSON.stringify(registration)));
}
