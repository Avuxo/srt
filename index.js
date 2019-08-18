'use strict';

const { readFileSync } = require('fs');
const parse = require('./parse');

if (process.argv.length < 3) process.exit();

const srt = readFileSync(process.argv[2]).toString();
const subs = parse(srt);

const optionalOffset = parseInt(process.argv[3]) || 0;
const startTime = Date.now() + optionalOffset;

let currentSubIndex = 0; // index of current parsed subtitle.
let currentTime = 0;
let counter = optionalOffset;

// every milisecond log the next subtitle.
setInterval(function() {
  counter ++;
  console.log(counter, subs[currentSubIndex].startTime);
  if (currentSubIndex == subs.length) {
    console.log('reached end of srt file.');
    process.exit();
  }

  if (counter == subs[currentSubIndex].startTime) {
    console.log(subs[currentSubIndex].text);
    currentSubIndex++;
  }
}, 1000);
