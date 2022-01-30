const siege = require('siege');

// siege()  .on(3000)  .for(10000).times  .get('/')  .attack();

  siege('node test_mysql_error.js')
  .on(3000)
  .for(1000).times
  .get('/')
  .attack();

