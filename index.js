// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMYLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
  
// });

// fetchCoordsByIP("65.94.166.27", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Your coordinates are:' , coords);
// });

// const myCoords = { latitude: "45.46670" , longitude: "-73.88330" }

// fetchISSFlyOverTimes(myCoords, (error, flyOverData) => {

//   if(error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
  
//   console.log("It worked! Here are the next ISS pass times for your coordinates:", flyOverData);
// });

const readableFlyOverTimes = function(flyOverData) {
  for (let times of flyOverData) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(times.risetime);
    const duration = times.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMYLocation((error, flyOverData) => {
  if(error) {
    return console.log("It didn't work!", error);
  }

  readableFlyOverTimes(flyOverData);
});
