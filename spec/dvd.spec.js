const request = require("request");

const base_url = 'http://localhost:3035/';
const dvd_url = base_url + 'dvd/all/IN'; // Modify the URL to test /dvd/IN
const not_found_url = base_url + 'dvd/'; // Modify the URL to test /dvd/

describe("DVD Server E2E Test", function () {
    describe("GET /dvd/India", () => {
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
