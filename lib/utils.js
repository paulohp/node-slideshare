var crypto = require('crypto');

sha1 = function(data) {
    var generator = crypto.createHash('sha1');
    generator.update(data);
    return generator.digest('hex');
};
