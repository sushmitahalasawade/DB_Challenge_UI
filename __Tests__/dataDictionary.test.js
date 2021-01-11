/**
 * Unit test for datadictionary.
 */
const util = require("../util.js");
const addLatestCcyPairs = util.addLatestCcyPairs;
const insertDataInDict = util.insertDataInDict;

var dummyDict1 = {};
var dummyDict2 = {
  euraud: ["1.4404", "1.5307", "1.2345", "2.3467"],
  eurchf: ["1.5000", "1.4141", "1.5307", "0.2034"],
  eurjpy: ["1.4245", "1.4523", "1.4119"],
  gbpaud: ["1.1202", "1.0653", "1.5307", "0.2034"],
  gbpcad: ["1.4404", "1.5307", "1.0000"],
  gbpchf: ["1.4404", "1.5307", "2.0000"],
  gbpeur: ["1.4404", "1.5307", "1.2345", "2.3467", "1.4567"],
  gbpjpy: ["1.4404", "1.5307"],
  gbpusd: ["1.4365"]
};
var dummyDict3 = {
  euraud: ["1.4404", "1.5307", "1.2345", "2.3467", "1.2394"],
  eurchf: ["1.5000", "1.4141", "1.5307", "0.2034"],
  eurjpy: ["1.4245", "1.4523", "1.4119"],
  gbpaud: ["1.1202", "1.0653", "1.5307", "0.2034"],
  gbpcad: ["1.4404", "1.5307", "1.0000"],
  gbpchf: ["1.4404", "1.5307", "2.0000"],
  gbpeur: ["1.4404", "1.5307", "1.2345", "2.3467", "1.4567"],
  gbpjpy: ["1.4404", "1.5307"],
  gbpusd: ["1.4365"]
};

describe("Add Latest(30) CcyPairs function testing", () => {
  test("Add 1st ccy pair in array", () => {
    let dummyCcyArr = new Array();
    const dummyCcyArrResult = ["usdjpy"];
    expect(addLatestCcyPairs(dummyCcyArr, dummyDict1, "usdjpy")).toEqual(
      expect.arrayContaining(dummyCcyArrResult)
    );
  });

  test("Add 30th ccy pair in array", () => {
    let dummyCcyArr = [
      "gbpeur", "gbpjpy", "euraud", "eurchf", "gbpchf",
      "gbpcad", "eurchf", "gbpaud", "gbpcad", "euraud",
      "gbpcad", "euraud", "gbpchf", "eurjpy", "eurjpy",
      "eurchf", "eurjpy", "gbpjpy", "gbpusd", "gbpaud",
      "euraud", "gbpeur", "gbpeur", "gbpaud", "gbpchf",
      "gbpaud", "eurchf", "gbpeur", "gbpeur"
    ];
    const dummyCcyArrResult = [
      "gbpeur", "gbpjpy", "euraud", "eurchf", "gbpchf",
      "gbpcad", "eurchf", "gbpaud", "gbpcad", "euraud",
      "gbpcad", "euraud", "gbpchf", "eurjpy", "eurjpy",
      "eurchf", "eurjpy", "gbpjpy", "gbpusd", "gbpaud",
      "euraud", "gbpeur", "gbpeur", "gbpaud", "gbpchf",
      "gbpaud", "eurchf", "gbpeur", "gbpeur", "eurcad"
    ];
      
    expect(addLatestCcyPairs(dummyCcyArr, dummyDict2, "eurcad")).toEqual(
      expect.arrayContaining(dummyCcyArrResult)
    );
  });

  test("Add 31st ccy pair in array", () => {
    var dummyCcyArr =   [
      "gbpeur", "gbpjpy", "euraud", "eurchf", "gbpchf",
      "gbpcad", "eurchf", "gbpaud", "gbpcad", "euraud",
      "gbpcad", "euraud", "gbpchf", "eurjpy", "eurjpy",
      "eurchf", "eurjpy", "gbpjpy", "gbpusd", "gbpaud",
      "euraud", "gbpeur", "gbpeur", "gbpaud", "gbpchf",
      "gbpaud", "eurchf", "gbpeur", "gbpeur", "eurcad"
    ];
    const dummyCcyArrResult = [
      "gbpjpy", "euraud", "eurchf", "gbpchf", "gbpcad",
      "eurchf", "gbpaud", "gbpcad", "euraud", "gbpcad",
      "euraud", "gbpchf", "eurjpy", "eurjpy", "eurchf",
      "eurjpy", "gbpjpy", "gbpusd", "gbpaud", "euraud",
      "gbpeur", "gbpeur", "gbpaud", "gbpchf", "gbpaud",
      "eurchf", "gbpeur", "gbpeur", "eurcad", "gbpaud"
    ];

    expect(addLatestCcyPairs(dummyCcyArr, dummyDict3, "gbpaud")).toEqual(
      expect.arrayContaining(dummyCcyArrResult)
    );
  });
});

describe("Insert data in Dictionary function testing", () => {
  test("Add 1st [k,v] pair element in dictionary", () => {
    let dummyQuote = {
      name: "gbpeur",
      bestBid: 1.2979114551269073,
      bestAsk: 1.3399457812234195,
      openBid: 1.2611642251064907,
      openAsk: 1.3148357748935093,
      lastChangeAsk: -0.03914983231270275,
      lastChangeBid: -0.008294400485597042
    };
    let dummyResult = ["1.3189"];
    expect(insertDataInDict(dummyDict1, dummyQuote)).toEqual(
      expect.arrayContaining(dummyResult)
    );
  });

  test("Add 30th [k,v] pair element in dictionary", () => {
    let dummyQuote = {
      name: "gbpeur",
      bestBid: 1.2979114551269073,
      bestAsk: 1.3399457812234195,
      openBid: 1.2611642251064907,
      openAsk: 1.3148357748935093,
      lastChangeAsk: -0.03914983231270275,
      lastChangeBid: -0.008294400485597042
    };
    let dummyResult = [
      "1.4404", "1.5307", "1.2345", "2.3467", "1.4567", "1.3189"];
    expect(insertDataInDict(dummyDict2, dummyQuote)).toEqual(
      expect.arrayContaining(dummyResult)
    );
  });

  test("Add 31st [k,v] pair element in dictionary", () => {
    let dummyQuote = {
      name: "gbpeur",
      bestBid: 1.2979114551269073,
      bestAsk: 1.3399457812234195,
      openBid: 1.2611642251064907,
      openAsk: 1.3148357748935093,
      lastChangeAsk: -0.03914983231270275,
      lastChangeBid: -0.008294400485597042
    };
    let dummyResult = ["1.5307", "1.2345", "2.3467", "1.4567", "1.3189"];
    expect(insertDataInDict(dummyDict3, dummyQuote)).toEqual(
      expect.arrayContaining(dummyResult)
    );
  });
});
