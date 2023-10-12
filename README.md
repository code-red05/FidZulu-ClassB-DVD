# FidZulu-ClassB-DVD Service

 

This Node.js application provides functionality for retrieving and processing DVD data. It offers two data sources: DynamoDB and a JSON file. The application can be configured to use either source, and it allows for data retrieval and manipulation based on location.

 

## Prerequisites

 

Before you begin, ensure you have the following dependencies installed:

 

- [Node.js](https://nodejs.org/) v18.0 or higher
- [AWS SDK](https://aws.amazon.com/sdk-for-node-js/)
- [dotenv](https://www.npmjs.com/package/dotenv)

 

## Configuration

 

To configure the application, create a `.env` file in the project root directory with the following environment variables:

 

- `AWS_REGION`: The AWS region for DynamoDB (if using DynamoDB as the data source).
- `AWS_ACCESS_KEY_ID`: AWS access key ID (if using DynamoDB as the data source).
- `AWS_SECRET_ACCESS_KEY`: AWS secret access key (if using DynamoDB as the data source).

 

## Usage

 

To use this application, you have the following options:

 

1. **Retrieve Data from DynamoDB**: If the required AWS credentials are provided in the `.env` file, the application will retrieve data from DynamoDB using the `getAllDataFromDynamoDB` function. You can call this function to get all items from the specified DynamoDB table (`fz_dvd`).

 

2. **Retrieve Data from JSON File**: If AWS credentials are not provided, the application will read data from a JSON file (Dvdjson.json) using the `read_json_file` function. You can call the `list` function to retrieve all items from the JSON file.

 

3. **Get DVDs Data by Location**: 
  - The `get_dvds_dynamo` function allows you to query data based on a location argument from Dynamo DB. It accepts three location values: "IN," "IE," and "US-NC." Depending on the location, it calculates and returns updated prices for the DVDs.
  - The `get_dvds` function allows you to query data based on a location argument from JSON Files. It also accepts three location values: "IN," "IE," and "US-NC." Depending on the location, it calculates and returns updated prices for the DVDs.


 ## Endpoints


`GET {base_url:3035}/dvd/all/{location}`

Possible values of location are [IN, US-NC, IE]

`GET {base_url:3035}/dvd/team`

Fetches team details

## Example Data

 

The application uses a sample dataset for DVD products. You can replace this data with your own dataset as needed. Each DVD product should include the following attributes:

 

- `productId`
- `productName`
- `productDescription`
- `price`
- `rating`
- `genre`
- `director`
- `format`
- `runtime`
- `releaseYear`
- `imageUrl`

 

## Running the Application

 

To run the application, execute the desired functions within your Node.js environment. You can also create your own routes and endpoints based on these functions for use in your web application or API.

- Installation
  
    ```
    npm install
    npm install express -g 
    ```
    
- Run the app
  
    ```
    npm start
    ```
    
 - Run tests
   
   ```
   npm test
   ```

## Credits

 

This application is created and maintained by the DVDs Service Team:

 

- Member 1: Mehul Rana
- Member 2: Rushil Reddy
