// index2.js

const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })
  // .catch((error) => {
  //   console.log("sad times. It didn't work: ", error.messsage);
  // });

