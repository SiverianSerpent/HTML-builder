const fs = require('fs');
const path = require('path');
const {extname} = path;
let arr = [];
let result = '';


filenames = fs.readdirSync(`./05-merge-styles/styles`);
  
filenames.forEach(file => {
  if (extname(file) === '.css') {
    let stream = fs.ReadStream(`./05-merge-styles/styles/${file}`, 'utf-8').on('readable', () => {

      let data = stream.read();
      if (data != null) arr.push(data);
    
    })
  }
});

setTimeout(function() {
  if (!fs.existsSync(`./05-merge-styles/project-dist/bundle.css`)) {
    result = arr.join('\r\n');
    fs.writeFileSync( `./05-merge-styles/project-dist/bundle.css`, result, 'utf-8');
  } else {
    result = arr.join('\r\n');
    fs.writeFileSync( `./05-merge-styles/project-dist/bundle.css`, result, 'utf-8');
  }
}, 250);

