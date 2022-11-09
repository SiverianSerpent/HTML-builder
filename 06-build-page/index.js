const fs = require('fs');
const { basename } = require('path');
const path = require('path');
const makeDir = path.join(__dirname, 'project-dist');
const componentsDir = path.join(__dirname, 'components');
const {extname} = path;
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'style.css');
const assetsSrcFolder = path.join(__dirname, 'assets');
const assetsNewFolder = path.join(__dirname, 'project-dist', 'assets');
let arr = [];
let result = '';
let arrOfHTMLs = [];
let arrOfCompNames = [];
let newHTML;

fs.rm(makeDir, { recursive:true, force:true }, (err) => {
  if ( err ) {
    console.error(err.message);
  }
  fs.mkdir(assetsNewFolder, { recursive: true }, (err) => {
    if ( err ) {
        console.error(err);
    }
    fs.readdir(assetsSrcFolder, { withFileTypes: true }, (err, files) => {
      if ( err ) {
        console.log(err);
      }
      files.forEach(file => {
        fs.mkdir(path.join(assetsNewFolder, file.name),  { recursive: true }, (err) => {
          if ( err ) {
              console.error(err);
          }
          fs.readdir(path.join(assetsSrcFolder, file.name), { withFileTypes: true }, (err, files2) => {
            if ( err ) {
              console.log(err);
            }
            files2.forEach(file23 => {
                  if ( file23.isFile() ) {
                    fs.copyFile(path.join(assetsSrcFolder, file.name, file23.name), path.join(assetsNewFolder, file.name, file23.name), (err) => {
                      if ( err ) throw err;
                    })
                  }
                })
          })
        })
        }
      )
    })
  })
  fs.readFile(path.join(__dirname, 'template.html'), "utf8", 
  function(error,data){
      if(error) throw error;
      newHTML = data.toString('utf-8'); 
      fs.mkdir(makeDir, { recursive: true }, (err) => {
        if ( err ) {
            console.error(err);
        }
        fs.readdir(componentsDir,{withFileTypes: true},(err, data) => {

          data.forEach((file) => {
        
            arrOfCompNames.push(`{{` + basename(file.name).split('.')[0] + `}}`);
            let stream = fs.ReadStream(path.join(componentsDir, file.name), 'utf-8');
    
            stream.on('readable', () => {
    
            let data3 = stream.read();
            if (data3 != null) arrOfHTMLs.push(data3);
            
           })
          })
          fs.writeFile(path.join(makeDir, 'index.html'), '',function (err) {
            if (err) throw err;
            for (let i = 0; i < arrOfHTMLs.length; i++) {
              newHTML = newHTML.replace(arrOfCompNames[i], arrOfHTMLs[i]);
            }
            fs.appendFile(path.join(makeDir, 'index.html'), newHTML, (err) => {
              if (err) {
                console.log(err);
              }
            });
          });
          fs.readdir(srcPath, {recursive:true, withFileTypes: true }, (err, files) => {
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
        })
      })
  })
})








