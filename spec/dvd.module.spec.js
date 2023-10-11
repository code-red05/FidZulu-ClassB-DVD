let request = require("request");
let dvd = require("../dao/dvd");

describe("Dvd module test", () => {
    describe("load all Dvd's", () => {
    
        it("have four elements", () => {
            let results = dvd.list();
            expect(results.length).toBe(15);
        });
        
    });
    describe("load all bikes with taxes", () => {
     
        it("with location India", () => {
            let results = dvd.query_by_arg("India");
            expect(results[0].price).toBe(3067.9882);
        });
     
        it("with location Ireland", () => {
            let results = dvd.query_by_arg("Ireland");
            expect(results[0].price).toBe(2859.989);
        });
     
        it("with invalid location Pakistan", () => {
            let results = dvd.query_by_arg("Pakistan");
            expect(results).toBeNull();
        });
       
    });

});