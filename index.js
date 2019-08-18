'use strict';

const { readFileSync } = require('fs');
const parse = require('./parse');

if (process.argv.length < 3) process.exit();

const srt = readFileSync(process.argv[2]).toString();
const subs = parse(srt);

let counter = parseInt(process.argv[3]) || 0; // optional offset for sub in ms
let currentSubIndex = 0; // index of current parsed subtitle.

// every milisecond log the next subtitle.
setInterval(function() {
  if (currentSubIndex == subs.length) {
    console.log('reached end of srt file.');
    process.exit();
  }

  if (counter == subs[currentSubIndex].startTime) {
    console.log(subs[currentSubIndex].text);
    currentSubIndex++;
  }

  counter += 1;
}, 1);
