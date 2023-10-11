const path= require('path');
const rootPath= path.resolve(__dirname, '../');
const filepath=path.join(rootPath, 'resources/teamjson.json');
const fs = require('fs');

let read_json_file = () =>{
    return fs.readFileSync(filepath);
}

exports.list = () =>{
    return JSON.parse(read_json_file());
}