const path = require('path');
const rootPath = path.resolve(__dirname, '../');
const filepath = path.join(rootPath, 'resources/Dvdjson.json');
const fs = require('fs');

let read_json_file = () => {
    return fs.readFileSync(filepath);
}

exports.list = () => {
    return JSON.parse(read_json_file());
}

const getAllDataFromDynamoDB = require('./daoImpl');



exports.query_by_arg_dynamo = async (value) => {
    if (value !== "IN" && value !== "IRE" && value !== "US-NC") {
        return null;
    }
    try {
        // Use the asynchronous DAO function to get data from DynamoDB
        const data = await getAllDataFromDynamoDB();
        // console.log(data)
        // Process the data based on the location value
        const results = data.map((item) => {
            const resultItem = { ...item };
            if (value === "IN") {
                resultItem.price *= 83;
                resultItem.price *= 1.18;
            } else if (value === "IRE") {
                resultItem.price *= 0.94;
                resultItem.price *= 1.23;
            }
            else {
                resultItem.price *= 1.08;
            }
            resultItem.price = parseFloat(resultItem.price.toFixed(2));
            //   console.log("Results   ========>",resultItem);
            return resultItem;
        });
        console.log("Results   ========>", results);
        return results;
    } catch (error) {
        console.error('Error querying data from DynamoDB:', error);
        return null;
    }
}

exports.query_by_arg = (value) => {
    if (value !== "IN" && value !== "IRE" && value !== "US-NC") {
        return null;
    }
    let results = JSON.parse(read_json_file());
    console.log("Query by location: " + value);
    for (let i = 0; i < results.length; i++) {
        let product = results[i];
        if (value === "IN") {
            product.price *= 83;
            product.price *= 1.18;
        } else if (value === "IRE") {
            product.price *= 0.94;
            product.price *= 1.23;
        }
        else {
            product.price *= 1.08;
        }
        product.price = product.price.toFixed(2);
    }
    return results;
}

// exports.post_toy = (toys) => {
//     if (toys.hasOwnProperty("name") && toys.hasOwnProperty("brand") && toys.hasOwnProperty("age_group") &&
//      toys.hasOwnProperty("price") && Object.keys(toys).length == 4) {
//         let results = JSON.parse(read_json_file());
//         results[results.length] = toys;
//         const data = JSON.stringify(results);
//         fs.writeFile("../Resources/Toysjson.json", data, err=>{
//             if(err){
//                 console.log("Error writing file" ,err)
//             } else {
//                 console.log('JSON data is written to the file successfully')
//             }
//         })
//         return toys;
//     }
//     return null;
// }

exports.reset_json = (content) => {
    const data = JSON.stringify(content);
    fs.writeFile("../Resources/Dvdjson.json", data, err => {
        if (err) {
            console.log("Error writing file", err)
        } else {
            console.log('JSON data is written to the file successfully')
        }
    })
}