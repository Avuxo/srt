'use strict';

// parse an SRT file into the following object:
// [
//   {
//     startTime: Number,
//     endTime: Number, // (for our purposes this field is basically pointless)
//     text: String
//   }*
// ]
function parse(srt) {
  srt = srt.split(/\r?\n\r?\n/);
  srt = srt.filter(s => s !== undefined && s !== '');
  srt = srt.map(parseSub);

  return srt;
};

// given a specific split sub, give a parsed version back.
function parseSub(sub) {
  const tokens = sub.split(/\r?\n/);
  const timeTokens = tokens[1].split(' --> ').map(parseTime);
  return {
    startTime: timeTokens[0],
    endTime: timeTokens[1],
    text: tokens.slice(2).join('\n')
  };
}

// given an SRT timestamp (HH:MM:SS,MSM ex: 00:01:14,853) convert to millisecond timestamp
function parseTime(timestamp) {
  const tokens = timestamp.split(':');
  const seconds = tokens[2].split(',');

  return parseInt(seconds[1])      + // milliseconds
    (parseInt(seconds[0]) * 1000)  + // seconds
    (parseInt(tokens[1]) * 60000)  + // minutes
    (parseInt(tokens[0]) * 3600000); // hours
    
}

module.exports = parse;
