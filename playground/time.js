//Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

var moment = require('moment');

var date = moment();

//shorthand vers of month
// console.log(date.format('MMM Do, YYYY '));
// console.log(date.format('D'));
// console.log(date.format('MMM'));

// date.add(1,'years').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'))

// new Date().getTime();
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
