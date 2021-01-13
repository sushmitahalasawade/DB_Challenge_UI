DB Updating Table Dev Challenge
===============================
Name : Sushmita Halasawade
Email ID : sushmitahalasawade@gmail.com

This module contains a development challenge completed for DB recruitment.

Changes are done in the site/index.html, site/styles.css and index.js files.
util.js file is created for utility functions.

index.js : Entry point of project and main JavaScript file.
site/index.html : HTML Scipt for table.
site/styles.css : CSS for table.
util.js : Functions used in index.js.


To view them, run

```
npm install
npm start
```

Jest package is used for unit testing.
Unit test files are written in \_\_Tests\_\_ folder.

To Test code, run

```
npm test
```

from within this directory.  This will start a development server (using webpack)
that supports hot reloading but also provides a stomp/ws endpoint providing fake
fx updates.

Once you've started the development server, navigate to http://localhost:8011
to see result .

Assuming fixed number of CCY Pairs :

Space complexity : O(1)
Time Complexity : O(n)  

1. subscribe to websocket connection to read FX prices.
2. Create table structure in HTML. - define headers.
3. Variable Dictionary dict with global scope is created for storing midprice of latest 30 quotes which will be used for sparkline graph.
4. Variable Array ccyArray  with global scope is created for maintaining latest 30 ccy pairs.
5. Assuming we are recieving a quote per second.
6. For each quote :
    - Calculate midprice for current quote and push it to dictionary in the format {"ccyPair" : [Array of midprice] }
    - Add ccyPair to ccyArray maintaing latest 30 records.
           If size of ccyArray exceeds 30, remove 1st record from ccyArray and remove its corresponding midprice value from dictionary.
    - Inserting or updating table and maintain sorting according to lastChangeBid :
        1. Check if ccypair exists in table , if yes , delete that row.
        2. Find row index for new quote by comparing lastChangeBid values of existing table and insert row at that index.
        3. For inserting row into HTML table create markup using getMarkup function.
    - Pass dictionary data to sparkline module to create sparkline chart corresponding to ccypair.    
