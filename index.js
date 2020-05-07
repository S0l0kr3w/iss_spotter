// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  // console.log(typeof ip);
});

fetchCoordsByIP((error, ip) => {
  if (error) {
    console.log("Coordinates not fetched" , error);
    return;
  }
  console.log('It worked! Here are the coordinates:' , ip);
  // console.log(typeof ip);
});