/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', function(error, response, body) {

    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // if we get here, all's well and we got the data
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  //request coords by IP
  request(`https://ipvigilante.com/json/${ip}`, function(error, response, body) {
      
    if (error) {
      return callback(error, null);
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });
 
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {

    if(error) {
      return callback(error, null);
    }

    if(response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
    }

    const flyOverData = JSON.parse(body).response;
    callback(null, flyOverData);
    
  }); 

};

const nextISSTimesForMYLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if(error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverData) => {
        if(error) {
          return callback(error, null);
        }

        callback(null, flyOverData);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMYLocation };

