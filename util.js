/** Usage : get location of new lastchangeinbid value
 *           from asc sorted lastchangeinbid array.
 * param1 : new lastchangeinbid price
 * param2 : lastchangeinbid sorted array
 **/
function findLocation(val, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (parseFloat(arr[i]) > parseFloat(val)) return i;
    }
    return arr.length;
  }
  
  /** Usage : insert ccy pair, mid price data in dictionary.
   * param1 : datadictionary
   * param2 : quote
   **/
  function insertDataInDict(dict, quote) {
    if (dict[quote.name]) {
      dict[quote.name].push(
        ((parseFloat(quote.bestBid) + parseFloat(quote.bestAsk)) / 2).toFixed(4)
      );
    } else {
      let MidPricearr = new Array();
      MidPricearr[0] = (
        (parseFloat(quote.bestBid) + parseFloat(quote.bestAsk)) /
        2
      ).toFixed(4);
      dict[quote.name] = Array.from(MidPricearr);
    }
    return dict[quote.name];
  }
  
  /** Usage : Maintain datadictionary and ccy pair array for latest 30 sec records.
   * param1 : ccypair array
   * param2 : ccypair: midprice  datadictionary
   * param3 : ccypair
   **/
  function addLatestCcyPairs(ccyArr, dict, ccyPair) {
    if (ccyArr.length == 30) {
      let ccypair = ccyArr.shift();
      dict[ccypair].shift();
    }
    ccyArr.push(ccyPair);
  
    return ccyArr;
  }
  
  /** Usage : Get markup to add in newly inserted row.
   * param1 : quote
   **/
  function getMarkup(quote) {
    let markup = "";
    markup += "<td>" +quote.name.substring(0, 3).toUpperCase() +
      "-" +
      quote.name.substring(3, quote.name.length).toUpperCase() +
      "</td>";
    markup += '<td style="padding-right:5px;">' + quote.bestBid.toFixed(4) + "</td>";
    markup += '<td  style="padding-right:5px;">' + quote.bestAsk.toFixed(4) + "</td>";
    markup += '<td style="padding-right:5px;">' + quote.openBid.toFixed(4) + "</td>";
    markup += '<td style="padding-right:5px;">' + quote.openAsk.toFixed(4) + "</td>";
    if (parseFloat(quote.lastChangeAsk).toFixed(4) > parseFloat(0)) {
      markup += '<td class ="positive" style="padding-right:5px;">' +
        quote.lastChangeAsk.toFixed(4) +
        "</td>";
    } else {
      markup += '<td class ="negative" style="padding-right:5px;">' +
        quote.lastChangeAsk.toFixed(4) +
        "</td>";
    }
    if (parseFloat(quote.lastChangeBid).toFixed(4) > parseFloat(0)) {
      markup += '<td class ="positive" style="padding-right:5px;">' +
        quote.lastChangeBid.toFixed(4) +
        "</td>";
    } else {
      markup += '<td class ="negative" style="padding-right:5px;">' +
        quote.lastChangeBid.toFixed(4) +
        "</td>";
    }
    markup += '<td  id = "spk_' + quote.name + '" style="padding-right:20px;"></td>';
    return markup;
  }
  
  /** Usage : Draw sparkline for given ccy pair at corresponding mid price column.
   * param1 : ccypair
   **/
  function drawSparkline(dict, name) {
    let exampleSparkline = document.getElementById("spk_" + name + "");
    Sparkline.draw(exampleSparkline, dict[name]);
  }
  
  exports.findLocation = findLocation;
  exports.addLatestCcyPairs = addLatestCcyPairs;
  exports.insertDataInDict = insertDataInDict;
  exports.getMarkup = getMarkup;
  exports.drawSparkline = drawSparkline;
  