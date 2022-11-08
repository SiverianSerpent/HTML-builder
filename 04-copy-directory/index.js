const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');


fs.rm(destFolder, { recursive:true, force:true }, (err) => {
  if ( err ) {
    console.error(err.message);
  }
  fs.mkdir(destFolder, { recursive: true }, (err) => {
    if ( err ) {
        console.error(err);
    }
    fs.readdir(srcFolder, { withFileTypes: true }, (err, files) => {
      if ( err ) {
        console.log(err);
      }
      files.forEach(file => {
        if ( file.isFile() ) {
          fs.copyFile(path.join(srcFolder, file.name), path.join(destFolder, file.name), (err) => {
            if ( err ) throw err;
          })
        }
      })
    })
  })
})




