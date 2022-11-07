const fs = require('fs');

let stream = fs.ReadStream('./01-read-file/text.txt', 'utf-8');

stream.on('readable', () => {

  let data = stream.read();
  if (data != null) console.log(data);

})

