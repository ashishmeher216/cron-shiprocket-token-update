require('dotenv').config();
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Function to update a specific environment variable
function updateEnvVariable(envFilePath, key, value) {
    let envContent = fs.readFileSync(envFilePath, 'utf-8');

    const regex = new RegExp(`^${key}=.*`, 'm');
    const newEnvVariable = `${key}=${value}`;

    if (envContent.match(regex)) {
        envContent = envContent.replace(regex, newEnvVariable);
    } else {
        envContent += `\n${newEnvVariable}`;
    }

    fs.writeFileSync(envFilePath, envContent, 'utf-8');
    // console.log(`Updated ${key} in .env file to: ${value}`);
}
const getShiprocketToken = async () => {
    console.log("Updating token at ", new Date().toLocaleString());
    const body = JSON.stringify({
        "email": process.env.SHIPROCKET_EMAIL,
        "password": process.env.SHIPROCKET_PASSWORD
    });
    const requestOptions = {
        method: "POST",
        body: body,
    };
    try{
        const response = await fetch(process.env.SHIPROCKET_AUTH_URL, requestOptions);
        const result = await response.json();
        updateEnvVariable(process.env.ENV_FILE_PATH_1,process.env.KEY_TO_UPDATE,result.token)
        updateEnvVariable(process.env.ENV_FILE_PATH_2,process.env.KEY_TO_UPDATE,result.token)
        updateEnvVariable(process.env.ENV_FILE_PATH_3,process.env.KEY_TO_UPDATE,result.token)
    }catch(error){
        console.log("Error => ", error.message)
    }
}

getShiprocketToken();