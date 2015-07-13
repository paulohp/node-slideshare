var Slideshare = require('../dist/slideshare');

var s = new Slideshare('', '');

s.getSlideshowById('13343768', function(data){
  console.log(data);
});