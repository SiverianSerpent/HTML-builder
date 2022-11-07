const { stdin, stdout, exit} = process;
const fs = require('fs');
let previousValue = '';

fs.writeFile('./02-write-file/text.txt', '', (err) => {

  err ? console.log(err) : null;

})

stdout.write('Введите текст:\n');

stdin.on('data', data => {

  if (data.toString('utf-8').trim() === 'exit') {

    console.log( "Bye Bye!" );
    process.exit();

  }
  previousValue = previousValue + data;
  
  fs.writeFile('./02-write-file/text.txt', previousValue, (err) => {

    err ? console.log(err) : null;

  })

});

process.on( "SIGINT", function() {

  console.log( "Bye Bye!" );
  process.exit();

});

