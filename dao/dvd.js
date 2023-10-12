const filepath = "./resources/Dvdjson.json";
const fs = require('fs');

let read_json_file = () => {
    return fs.readFileSync(filepath);
}

exports.list = () => {
    return JSON.parse(read_json_file());
}

const daoImpl = require('./daoImpl');



exports.get_dvds_dynamo = async (value) => {
    if (value !== "IN" && value !== "IE" && value !== "US-NC") {
        return null;
    }
    try {
        // Use the asynchronous DAO function to get data from DynamoDB
        const data = await daoImpl.getAllDataFromDynamoDB();
        // console.log(data)
        // Process the data based on the location value
        const results = data.map((item) => {
            const resultItem = { ...item };
            if (value === "IN") {
                resultItem.price *= 83;
                resultItem.price *= 1.18;
            } else if (value === "IE") {
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
        console.log("switching to local json data...");
        return this.get_dvds(value);
        // return null;
    }
}

exports.get_dvds = (value) => {
    if (value !== "IN" && value !== "IE" && value !== "US-NC") {
        return null;
    }
    let results = JSON.parse(read_json_file());
    console.log("Query by location: " + value);
    for (let i = 0; i < results.length; i++) {
        let product = results[i];
        if (value === "IN") {
            product.price *= 83;
            product.price *= 1.18;
        } else if (value === "IE") {
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