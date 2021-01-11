// This is not really required, but means that changes to index.html will cause a reload.
require("./site/index.html");
// Apply the styles in style.css to the page.
require("./site/style.css");
const util = require("./util.js");
const findLocation = util.findLocation;
const addLatestCcyPairs = util.addLatestCcyPairs;
const insertDataInDict = util.insertDataInDict;
const getMarkup = util.getMarkup;
const drawSparkline = util.drawSparkline;
const LAST_CHNG_BID_COL = 6;
const CCY_PAIR_COL = 0;

global.DEBUG = false;
const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);

//global variables
var dict = {};
var ccyArr = new Array();

client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg);
  }
};

function connectCallback() {
  document.getElementById("stomp-status").innerHTML =
    "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs.";
  const subscription = client.subscribe(
    "/fx/prices",
    UpdateFXPrice,
    function (error) {
      alert(error.headers.message);
    }
  );
  
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message);
});

/** Usage : Main method. Insert data  to table in asc sorting order. 
 *          Draw Sparkline graph for ccypair in latest 30 sec .
 * param1 : quote message
 **/
function UpdateFXPrice(message) {
  try {
    let quote;
    try {
      quote = JSON.parse(message.body);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e, true);
      } else {
        console.log(e, false);
      }
    }
    const table = document.getElementById("container");
    const tr = table.getElementsByTagName("tr");
    let lastBidarr = new Array();
    // insert ccy pair, mid price data in dictionary.
    insertDataInDict(dict, quote);
    // maintain datadictionary and ccy pair array for latest 30sec records.
    addLatestCcyPairs(ccyArr, dict, quote.name);

    if (table.rows.length > 1) {
      let deleterow = 0;
      let sortcount = 0;

      for (let i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        let tdata = td[CCY_PAIR_COL];
        // check if ccypair already exists in table.
        // if exists: delete row.Else: maintain lastchangeinbid asc sorted array.
        if (
          tdata.innerHTML.indexOf(
            quote.name.substring(0, 3).toUpperCase() +
              "-" +
              quote.name.substring(3, quote.name.length).toUpperCase()
          ) > -1
        ) {
          deleterow = tr[i].rowIndex;
        } else {
          lastBidarr[sortcount] = td[LAST_CHNG_BID_COL].innerHTML;
          sortcount++;
        }
      }

      // delete existing row from table
      if (deleterow > 0) {
        document.getElementById("container").deleteRow(deleterow);
      }
    }
    // get location of new lastchangebid value from asc sorted lastchangebid array.
    let index = findLocation(quote.lastChangeBid, lastBidarr);
    // add new row at given index in table.
    let newRow = document
      .getElementById("container")
      .getElementsByTagName("tbody")[0]
      .insertRow(index + 1);
    // get markup to add in newly inserted row.
    let markup = getMarkup(quote);
    newRow.innerHTML = markup;
    // draw sparkline for given ccy pair.
    drawSparkline(dict, quote.name);
  } catch (ex) {
    console.log(ex);
  }
}
