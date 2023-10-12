const fs = require('fs');
const filepath  = "./resources/Teamjson.json";

let read_json_file = () =>{
    return fs.readFileSync(filepath);
}

exports.list = () =>{
    return JSON.parse(read_json_file());
}