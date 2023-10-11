const request = require("request");
const dvd = require("../dao/dvd"); // Import your dvd module

describe("Dvd module test", () => {
  describe("load all DVDs", () => {
    it("should return an array of DVDs", () => {
      const results = dvd.list();
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe("load all DVDs with taxes", () => {
    it("with location India", () => {
      const results = dvd.query_by_arg("India");
      expect(results[0].price).toBeCloseTo(1468.1206, 4); // Close approximation for floating-point comparison
    });

    it("with location Ireland", () => {
      const results = dvd.query_by_arg("Ireland");
      expect(results[0].price).toBeCloseTo(17.331, 3); // Close approximation for floating-point comparison
    });

    it("with an invalid location Pakistan", () => {
      const results = dvd.query_by_arg("Pakistan");
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
      expect(updatedData.length).toBe(20);
      expect(updatedData[0].productName).toBe("Inception");
      expect(updatedData[0].price).toBe(14.99);
    });
  });
});
