/**
 * Unit test for sorting.
 */
const util = require("../util.js");
const findLocation = util.findLocation;

describe("Find Location function testing", () => {
  test("Find location of positive element in sorted array in asc order", () => {
    let dummyLastBidarr = [-8.0, 1.0, 1.24, 1.8, 2.0];
    expect(findLocation(1.2, dummyLastBidarr)).toBe(2);
  });

  test("Find location of negative element in sorted array in asc order", () => {
    let dummyLastBidarr = [-8.0, 1.0, 1.24, 1.8, 2.0];
    expect(findLocation(-11.2, dummyLastBidarr)).toBe(0);
  });

  test("Find location of zero element in sorted array in asc order", () => {
    let dummyLastBidarr = [-8.0, 1.0, 1.24, 1.8, 2.0];
    expect(findLocation(0, dummyLastBidarr)).toBe(1);
  });

  test("Find location of  element in empty array in asc order", () => {
    let dummyLastBidarr = [];
    expect(findLocation(11, dummyLastBidarr)).toBe(0);
  });
});
