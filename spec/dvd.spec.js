const request = require("request");
const app = require('../index');

// const daoImpl = require('../dao/daoImpl'); 
// const AWS = require('aws-sdk');
// const dvd = require("../dao/dvd"); // Import your dvd module

var http = require('http');

const base_url = 'http://localhost:3005/';
const dvd_url = base_url + 'dvd/all/IN'; // Modify the URL to test /dvd/IN
const not_found_url = base_url + 'dvd/'; // Modify the URL to test /dvd/

app.set('port', 3005);


describe("DVD Server E2E Test", function () {
    let server;
    
    beforeAll(() => {
        server = http.createServer(app);
        server.listen(3005);
    });
    afterAll((done) => {
        
      server.close(done); // Shutdown the server after tests are complete
    });
    
    describe("GET /dvd/all/IN", () => {
        it("returns status code 200",  (done) => {
            request.get(dvd_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
        it("contains price", (done) => {
            request.get(dvd_url, (error, response, body) => {
                expect(body).toBeTruthy();
                expect(body).toContain("price");
                expect(body).toContain("productName");
                done();
            });
        });
    });

    // Test for the wrong path and expect 404
    describe("GET /dvd/", () => {
        it("returns status code 404",  (done) => {
            request.get(not_found_url, (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });

    // Additional test cases
    describe("GET with localhost:3035", () => {
        it("returns status code 404",  (done) => {
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });

    describe("GET /dvd/Pakistan", () => {
        it("returns status code 404",  (done) => {
            request.get(not_found_url + "China", (error, response, body) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});
