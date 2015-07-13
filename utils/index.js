var rest = require('restler');
var crypto = require('crypto');

function sha1 (data) {
  var generator = crypto.createHash('sha1').update(data).digest('hex');
  return generator;
};

var utils = {};

// The timestamp
utils.timestamp = function() {
  return Math.round(new Date().getTime() / 1000);
};

// The hash method: returns the current hash
utils.currentHash = function(secret) {
  return sha1(secret + this.timestamp());
};

// Get core parameters required in every API call
utils.coreParams = function(api_key, secret) {
  return {
    parser: rest.parsers.xml,
    data: {
      api_key: api_key,
      ts: this.timestamp(),
      hash: this.currentHash(secret)
    }
  }
};

module.exports = utils;