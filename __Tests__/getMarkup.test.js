/**
 * Unit test for markup.
 */
const util = require("../util.js");
const getMarkup = util.getMarkup;

describe("getMarkup function testing", () => {
  test("Get markup to add in row with negative lastchangebid, lastchangeask values", () => {
    const dummyQuote = {
      name: "eurchf",
      bestBid: 1.0862114551269073,
      bestAsk: 1.1093457812234195,
      openBid: 1.0930642251064907,
      openAsk: 1.1008357748935093,
      lastChangeAsk: -0.03574983231270275,
      lastChangeBid: -0.010194400485597042
    };
    const dummyMarkupResult =
      '<td>EUR-CHF</td><td style="padding-right:5px;">1.0862</td><td  style="padding-right:5px;">1.1093</td><td style="padding-right:5px;">1.0931</td><td style="padding-right:5px;">1.1008</td><td class ="negative" style="padding-right:5px;">-0.0357</td><td class ="negative" style="padding-right:5px;">-0.0102</td><td  id = "spk_eurchf" style="padding-right:20px;"></td>';
    expect(getMarkup(dummyQuote)).toBe(dummyMarkupResult);
  });

  test("Get markup to add in row with positive lastchangebid, lastchangeask values", () => {
    const dummyQuote = {
      name: "eurchf",
      bestBid: 1.0862114551269073,
      bestAsk: 1.1093457812234195,
      openBid: 1.0930642251064907,
      openAsk: 1.1008357748935093,
      lastChangeAsk: 0.03574983231270275,
      lastChangeBid: 0.010194400485597042
    };
    const dummyMarkupResult =
      '<td>EUR-CHF</td><td style="padding-right:5px;">1.0862</td><td  style="padding-right:5px;">1.1093</td><td style="padding-right:5px;">1.0931</td><td style="padding-right:5px;">1.1008</td><td class ="positive" style="padding-right:5px;">0.0357</td><td class ="positive" style="padding-right:5px;">0.0102</td><td  id = "spk_eurchf" style="padding-right:20px;"></td>';
    expect(getMarkup(dummyQuote)).toBe(dummyMarkupResult);
  });
});
