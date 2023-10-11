const request = require("request");
const dvd = require("../dao/dvd"); // Import your dvd module

describe("Dvd module test", () => {
  describe("load all DVDs", () => {
    it("should return an array of DVDs", async () => {
      const results =  await dvd.query_by_arg_dynamo("IN");
      expect(results).toHaveSize(15);
    });
  });

  describe("load all DVDs with taxes", () => {
    it("with location India", async () => {
      const results = await dvd.query_by_arg_dynamo("IN");
      expect(results[0].price).toBeCloseTo(1076.36, 4); // Close approximation for floating-point comparison
    });

    it("with location Ireland", async () => {
      const results = await dvd.query_by_arg_dynamo("IRE");
      expect(results[0].price).toBeCloseTo(12.71, 3); // Close approximation for floating-point comparison
    });

    it("with an invalid location Pakistan", async () => {
      const results =await dvd.query_by_arg_dynamo("PK");
      expect(results).toBeNull();
    });
  });

  describe("reset JSON data", () => {
    it("should reset the JSON file", () => {
      // Prepare a mock content to reset the JSON file
      const mockContent = [{ productName: "Inception", price: 14.99 }];

      // Call the reset_json function
      dvd.reset_json(mockContent);

      // Load the updated data from the file
      const updatedData = dvd.list();
      
      // Make assertions to verify that the data was reset
      expect(updatedData.length).toBeGreaterThanOrEqual(15);
      expect(updatedData[0].productName).toBe("Inception");
      expect(updatedData[0].price).toBe(14.99);
    });
  });
});
