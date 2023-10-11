const AWS = require('aws-sdk');
const async = require('async');
require('dotenv').config();

const dvd = require('./dao/dvd');

// Configure your AWS credentials
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

const docClient = new AWS.DynamoDB.DocumentClient();


// const jsonData = [
//     {
//         "productId": 9001,
//         "productName": "Trek Domane SL 6",
//         "productDescription": "A high-performance road bike with carbon frame and Shimano components.",
//         "price": 2599.99,
//         "rating": 4.7,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Ultegra",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://media.karousell.com/media/photos/products/2022/8/10/trek_domane_sl6_52cm_2022_1660134947_4c7bc733_progressive"
//     },
//     {
//         "productId": 9002,
//         "productName": "Trek Emonda SL 5",
//         "productDescription": "A lightweight road bike with a carbon frame and Shimano 105 components.",
//         "price": 1999.99,
//         "rating": 4.5,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano 105",
//         "brakeType": "Rim",
//         "tireSize": "700c",
//         "suspensionType": "None",
//         "imageUrl": "https://www.wheelbase.co.uk/wp-content/uploads/import/Trek/2023/23-Trek-Emonda-SL7-White.jpg"
//     },
//     {
//         "productId": 9003,
//         "productName": "Giant Defy Advanced Pro 1",
//         "productDescription": "A top-tier endurance road bike with a carbon frame and Shimano Ultegra components.",
//         "price": 3599.99,
//         "rating": 4.8,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Ultegra",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://m.media-amazon.com/images/I/41RWV+wQfTL._AC_UF894,1000_QL80_.jpg"
//     },
//     {
//         "productId": 9004,
//         "productName": "Cannondale Synapse Carbon 105",
//         "productDescription": "A versatile road bike with a carbon frame and Shimano 105 components.",
//         "price": 2299.99,
//         "rating": 4.6,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano 105",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://content.bikeroar.com/system/product/000/084/057/large/synapse_carbon_5_105_2nd.png?1465871637"
//     },
//     {
//         "productId": 9005,
//         "productName": "Specialized Roubaix Comp",
//         "productDescription": "An endurance road bike with a carbon frame and Shimano Ultegra components.",
//         "price": 2999.99,
//         "rating": 4.7,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Ultegra",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://m.media-amazon.com/images/I/81TBY4fKJZL._AC_UF1000,1000_QL80_.jpg"
//     },
//     {
//         "productId": 9006,
//         "productName": "Trek Madone SL 7",
//         "productDescription": "A high-end aero road bike with a carbon frame and Shimano Dura-Ace components.",
//         "price": 4999.99,
//         "rating": 4.9,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Dura-Ace",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://s3.ap-south-1.amazonaws.com/choosemybicycle.webp/media/261_1.webp"
//     },
//     {
//         "productId": 9007,
//         "productName": "Giant TCR Advanced Pro 2",
//         "productDescription": "A high-performance road bike with a carbon frame and Shimano Ultegra components.",
//         "price": 2799.99,
//         "rating": 4.7,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Ultegra",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://m.media-amazon.com/images/I/61GcUT6yrDL._AC_UF1000,1000_QL80_.jpg"
//     },
//     {
//         "productId": 9008,
//         "productName": "Cannondale CAAD13 105",
//         "productDescription": "An aluminum road bike with Shimano 105 components.",
//         "price": 1799.99,
//         "rating": 4.4,
//         "frameMaterial": "Aluminum",
//         "gearSystem": "Shimano 105",
//         "brakeType": "Rim",
//         "tireSize": "700c",
//         "suspensionType": "None",
//         "imageUrl": "https://m.media-amazon.com/images/I/817+y7gb1VL.jpg"
//     },
//     {
//         "productId": 9009,
//         "productName": "Specialized Allez Sprint Comp",
//         "productDescription": "A sprint-oriented road bike with an aluminum frame and Shimano 105 components.",
//         "price": 2199.99,
//         "rating": 4.6,
//         "frameMaterial": "Aluminum",
//         "gearSystem": "Shimano 105",
//         "brakeType": "Rim",
//         "tireSize": "700c",
//         "suspensionType": "None",
//         "imageUrl": "https://www.bikepanthi.com/wp-content/uploads/2010/08/herocycles-adventure-ranger-cycle.jpg"
//     },
//     {
//         "productId": 9010,
//         "productName": "Cervelo S3 Disc Ultegra",
//         "productDescription": "A high-performance aero road bike with a carbon frame and Shimano Ultegra components.",
//         "price": 4299.99,
//         "rating": 4.8,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Ultegra",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://m.media-amazon.com/images/I/61GjKj5y+4L._AC_UF894,1000_QL80_.jpg"
//     },
//     {
//         "productId": 9011,
//         "productName": "Trek Checkpoint SL 5",
//         "productDescription": "A gravel and adventure bike with a carbon frame and Shimano 105 components.",
//         "price": 2399.99,
//         "rating": 4.7,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano 105",
//         "brakeType": "Disc",
//         "tireSize": "700c",
//         "suspensionType": "Front",
//         "imageUrl": "https://5.imimg.com/data5/YW/UK/HM/SELLER-24532083/bsa-ladybird-dreamz-26t-egyptian-violet-bicycle-500x500.jpg"
//     },
//     {
//         "productId": 9012,
//         "productName": "Giant Trance Advanced Pro 29 2",
//         "productDescription": "A full-suspension mountain bike with a carbon frame and Shimano Deore components.",
//         "price": 3499.99,
//         "rating": 4.8,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano Deore",
//         "brakeType": "Disc",
//         "tireSize": "29",
//         "suspensionType": "Full",
//         "imageUrl": "https://s3.ap-south-1.amazonaws.com/choosemybicycle/media/1085_1.jpg"
//     },
//     {
//         "productId": 9013,
//         "productName": "Cannondale Scalpel Carbon 3",
//         "productDescription": "A cross-country mountain bike with a carbon frame and Shimano XT components.",
//         "price": 3799.99,
//         "rating": 4.9,
//         "frameMaterial": "Carbon",
//         "gearSystem": "Shimano XT",
//         "brakeType": "Disc",
//         "tireSize": "29",
//         "suspensionType": "Full",
//         "imageUrl": "https://rukminim1.flixcart.com/image/850/1000/cycle/k/s/k/super-strong-na-22-atlas-original-imaerm4368vhbxnc.jpeg?q=90"
//     },
//     {
//         "productId": 9014,
//         "productName": "Specialized Stumpjumper Comp",
//         "productDescription": "A trail mountain bike with an aluminum frame and Shimano SLX components.",
//         "price": 2699.99,
//         "rating": 4.6,
//         "frameMaterial": "Aluminum",
//         "gearSystem": "Shimano SLX",
//         "brakeType": "Disc",
//         "tireSize": "29",
//         "suspensionType": "Full",
//         "imageUrl": "https://cayabikes.com/wp-content/uploads/2021/06/Caya-Images_854X854pix_Kids-09-min-1.jpg"
//     },
//     {
//         "productId": 9015,
//         "productName": "Trek Fuel EX 7",
//         "productDescription": "A versatile trail and cross-country bike with an aluminum frame and Shimano Deore components.",
//         "price": 2299.99,
//         "rating": 4.7,
//         "frameMaterial": "Aluminum",
//         "gearSystem": "Shimano Deore",
//         "brakeType": "Disc",
//         "tireSize": "29",
//         "suspensionType": "Full",
//         "imageUrl": "https://m.media-amazon.com/images/I/718Sja9s-jL._AC_UF894,1000_QL80_.jpg"
//     }
// ];
// DynamoDB table name
const tableName = 'fz_dvd';

// Function to upload data to DynamoDB
function uploadToDynamoDB(item, callback) {
  const params = {
    TableName: tableName,
    Item: item,
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Uploaded:', item.productId);
    }

    callback(err, data);
  });
}

// Use the async library to upload the data in parallel

const jsonData = dvd.list();

async.each(
  jsonData,
  uploadToDynamoDB,
  (err) => {
    if (err) {
      console.error('One or more items failed to upload.');
    } else {
      console.log('All items uploaded successfully.');
    }
  }
);
