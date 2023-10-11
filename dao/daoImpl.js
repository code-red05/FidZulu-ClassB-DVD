const AWS = require('aws-sdk');
require('dotenv').config();


// Configure your AWS credentials
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });



// Create a DynamoDB Document Client
const docClient = new AWS.DynamoDB.DocumentClient();

// DynamoDB table name
const tableName = 'fz_dvd';

// Function to get all items from DynamoDB
function getAllDataFromDynamoDB() {

  const params = {
    TableName: tableName,
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      if (data.Items) {
        return data.Items;
      } else {
        console.log('No items found in the table.');
      }
    }
  });
}

// Call the function to retrieve all items from the DynamoDB table
function getAllDataFromDynamoDB(callback) {
    const params = {
        TableName: tableName,
    };

    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, data) => {
          if (err) {
            console.error('Error:', err);
            reject(err);
          } else {
            if (data.Items) {
              resolve(data.Items);
            } else {
              console.log('No items found in the table.');
              resolve([]);
            }
          }
        });
      });
    
}

module.exports = getAllDataFromDynamoDB;
