// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// let ipString = '';
// let geoCoords = {};

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//   ipString = ip
// });

// fetchCoordsByIP(ipString, (error, coords) => {
//   if (error) {
//     console.log('sad times', error);
//     return;
//   }
//   console.log(coords)
//   geoCoords = coords;
// });

// fetchISSFlyOverTimes(geoCoords, (error, times) => {
//   if (error) {
//     console.log('more sad times', error);
//     return;
//   }
//   console.log(times);
// })

// index.js

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});