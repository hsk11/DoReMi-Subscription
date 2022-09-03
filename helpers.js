/*
Author: Harpal Singh
*/

const fs = require('fs');
function getFile(fileName) {
    try {
        return fs.readFileSync(fileName, 'utf8');
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
// Parser for Inputs
function parseInputCommands(input) {
    const lines = input.split('\n');
    const commands = []
    lines.forEach(line => {
        line = line.toLowerCase();
        // ignore comments

        if (line.search(/^\s*\/\//) === -1 && line.trim() !== '') {
            commands.push(line.split(' ').map(command => command.trim()));
        }

    });
    return commands;

}

function displayDate(date){
   return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });

}
function customConsole(data, isNested = false, depth = 0) {
    // console.log(JSON.stringify(data));
    const keyColor='\x1b[32m';
    if (!isNested) {
        console.log("############################################################");
    }
    let beautify = (new Array(depth)).fill('|').join(' ')

    Object.keys(data).forEach(key => {
        if (key.toUpperCase() === 'ERROR') {
            beautify = '\x1b[31m' + beautify
        }
        else{
            beautify = beautify+keyColor+"\x1b[4m";
        }
        if (data[key] instanceof Object && !(data[key] instanceof Date)) {


            console.log(beautify + key[0].toLocaleUpperCase() + key.slice(1) + '\x1b[0m: ');

            customConsole(data[key], true, ++depth);
        }
        else {

            console.log(beautify + key[0].toLocaleUpperCase() + key.slice(1) + '\x1b[0m: ' 
            + (data[key] instanceof Date?displayDate(data[key]):data[key] )
            + (isNested ? "" : "\n"));

        }
    })
}
module.exports = {
    getFile,
    parseInputCommands,
    customConsole
}