// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  
});

fetchCoordsByIP("65.94.166.27", (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Your coordinates are:' , coords);
});

const myCoords = { latitude: "45.46670" , longitude: "-73.88330" }

fetchISSFlyOverTimes(myCoords, (error, flyOverTimes) => {

  if(error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log("It worked! Here are the next ISS pass times for your coordinates:", flyOverTimes);
});