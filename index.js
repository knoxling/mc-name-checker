
const nReadlines = require('n-readlines');
const p = require("phin")
const fs = require("fs")
let arrtocheck = []


const allFileContents = fs.readFileSync('names2.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
    arrtocheck.push(line.toString())
});

var index = 0;
var interval = setInterval(async function(){
    if(index >= arrtocheck.length) return;
    index++
    let idk = arrtocheck[index].toString()
    let res = await p({
        'url': `https://api.mojang.com/users/profiles/minecraft/${idk}`,
        'method':'GET'
    })
    if(res.statusCode == 200){
        console.log(`${idk} taken`)
    }
    if(res.statusCode == 204){
        console.log(`${idk} is avaliable`)
        fs.appendFile('avaliable.txt', `${idk}\n`, function (err) {
            if (err) {
              // append failed
            } else {
              // done
            }
          })

    }
    if(res.statusCode == 429){
        console.log(`API RATE LIMITED!`)
    }
     if(index == arrtocheck.length){
        clearInterval(interval);
     }
}, 1500)
