const fs = require('fs');
const path = require('path');
const {basename, extname} = path;

fs.readdir('./03-files-in-folder/secret-folder', (err, data) => {

  data.forEach((file) => {

    fs.stat(('./03-files-in-folder/secret-folder/' + file), (error, stats) => {

      if (stats.isFile()) {

        console.log(`${basename(file, extname(file))} - ${extname(file)} - ${(fs.statSync('./03-files-in-folder/secret-folder/' + file).size/1024)}kb`)
        
      }

    });
  })

})