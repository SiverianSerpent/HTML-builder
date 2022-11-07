const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const src = './04-copy-directory/files';
const dest = './04-copy-directory/files-copy';
let isSrcDirExists;
let isDestDirExists;



fs.exists('./04-copy-directory/files', (e) => (e) ? isSrcDirExists = true : isSrcDirExists = false);
fs.exists('./04-copy-directory/files-copy', (e) => (e) ? isDestDirExists = true : isDestDirExists = false);


  if (!isDestDirExists) {
  //   fs.mkdir('./04-copy-directory/files-copy/', (err) => {
  //     err ? console.log(err) : null;
  //   })
  //   fs.readdir(src, (err, files) => {
  //     if (err)
  //       console.log(err);
  //     else {
  //       files.forEach(file => {
  //         fs.copyFile(`${src}/${file}`, `${dest}/${file}`, (err) => {
  //           if (err) throw err;
  //         });
  //       })
  //     }
  //   })
  // } else if (fs.exists('./04-copy-directory/files-copy/', (e) => (e) ? true : false)){
  //   fs.readdir(dest, (err, files) => {
  //     if (err)
  //       console.log(err);
  //     else {
  //       files.forEach(file => {
  //         fs.unlink(`${dest}/${file}`, (err => {
  //           if (err) console.log(err);
  //         }));
  //       })
  //     }
  //   })
  //   fs.readdir(src, (err, files) => {
  //     if (err)
  //       console.log(err);
  //     else {
  //       files.forEach(file => {
  //         fs.copyFile(`${src}/${file}`, `${dest}/${file}`, (err) => {
  //           if (err) throw err;
  //         });
  //       })
  //     }
  //   })
  fsPromises.mkdir('./04-copy-directory/files-copy/', { recursive: true }).then(fs.readdir(src, (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
            fs.copyFile(`${src}/${file}`, `${dest}/${file}`, (err) => {
              if (err) throw err;
            });
          })
        }
      })) 
    } else {
      fs.readdir(dest, (err, files) => {
            if (err)
              console.log(err);
            else {
              files.forEach(file => {
                fs.unlink(`${dest}/${file}`, (err => {
                  if (err) console.log(err);
                }));
              })
            }
          })
          fs.readdir(src, (err, files) => {
            if (err)
              console.log(err);
            else {
              files.forEach(file => {
                fs.copyFile(`${src}/${file}`, `${dest}/${file}`, (err) => {
                  if (err) throw err;
                });
              })
            }
    })
  }
