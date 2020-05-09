const request = require('request-promise-native');

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const readableFlyOverTimes = function(flyOverData) {
  for (let times of flyOverData) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = { nextISSTimesForMyLocation, readableFlyOverTimes };