const request = require("request");
const dvd = require("../dao/dvd"); // Import your dvd module

describe("Dvd module test", () => {
  describe("load all DVDs", () => {
    it("should return an array of DVDs", async () => {
      const results =  await dvd.get_dvds_dynamo("IN");
      expect(results).toHaveSize(15);
    });
  });

  describe("load all DVDs with taxes", () => {
    it("with location India", async () => {
      const results = await dvd.get_dvds_dynamo("IN");
      expect(results[0].price).toBeGreaterThan(-1);
      expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
    });

    it("with location US", async () => {
      const results = await dvd.get_dvds_dynamo("US-NC");
      expect(results[0].price).toBeGreaterThan(-1);
      expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
    });

    it("with location Ireland", async () => {
      const results = await dvd.get_dvds_dynamo("IE");
      expect(results[0].price).toBeGreaterThan(-1);
      expect(results[0].price.toString()).toMatch(/^\d+\.\d{2}$/);
    });

    it("with an invalid location Pakistan", async () => {
      const results = await dvd.get_dvds_dynamo("PK");
      expect(results).toBeNull();
    });
  });
});
