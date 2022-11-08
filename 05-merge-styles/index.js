const fs = require('fs');
const path = require('path');
const {extname} = path;
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');
let arr = [];
let result = '';


fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
  if ( err ) {
    console.log(err);
  }
  files.forEach(file => {
    if ( extname(file.name) === '.css' ) {
      let stream = fs.ReadStream(path.join(srcPath, file.name), 'utf-8').on('readable', () => {
        let data = stream.read();
        if (data != null) {
          arr.push(data); 
        }
        result = arr.join('\r\n');
        fs.writeFile(destPath, result, (err) => {
          err ? console.log(err) : null;
        })
      })
    }
  })
})

