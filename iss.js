const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  request(`https://api.ipbase.com/v2/info?ip=${ip}&apikey=sTGKFhA0u8BfRz2LVYUoEDbCtOBUhikeengmscfy`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coords: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data.location;
    callback(null, { latitude, longitude });
  })
}

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching fly over times: ${body}`), null);
      return;
    }

    const times = JSON.parse(body).response
    callback(null, times);
  })
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          callback(error, null);
        }
        callback(null, times);
      })
    })
  })
}

module.exports = { nextISSTimesForMyLocation };