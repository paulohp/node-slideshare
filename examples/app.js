var Slideshare = require('../dist/slideshare');

var s = new Slideshare('3CxTU48V', 'gFHqF1GI');

s.getSlideshowById('13343768', function(data){
  console.log(data);
});