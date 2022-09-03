/*
Author: Harpal Singh
*/

// get Filename: app.js
const fileName = process.argv[2];
if (!fileName) {
    console.log('Please provide a filename');
    process.exit(1);
}

// read file
const { getFile, parseInputCommands } = require('./helpers');

const commands = parseInputCommands(getFile(fileName));
const { user } = require('./controllers');

commands.forEach(command => {
    const [commandName, operation, ...args] = command;
    if (commandName === 'user') {
        switch (operation) {
            case 'create':
                {

                    const [email, password] = args;
                    user.create(email, password);

                    break;
                }
            case 'login':
                {
                    const [email, password] = args;
                    user.login(email, password);
                    break;
                }
            case 'delete':
                {
                    const [token] = args;
                    user.delete(token);
                    break;
                }
            case 'get':
                {
                    const [token] = args;
                    user.get(token);
                    break;
                }
            default:
                console.log('Invalid command');
                break;
        }
    }
    else if (commandName === 'subscription') {
        switch (operation) {
            case 'reminders':{
                
                user.remindersSUB();
                break;
            }
            case 'add':
                {
                    const [type, plan] = args;
                    user.addSUB(type, plan);
                    break;
                }
            case 'get':
                {
                    const [type] = args;
                    user.getSUB(type);
                    break;
                }
            case 'getall':
                {

                    user.getAllSUB();
                    break;
                }
            case 'cancel':
                {
                    const [type] = args;
                    user.cancelSUB(type);
                    break;
                }
            case 'topup': {
                const [plan] = args;
                user.addTopUpSUB(plan);
                break;
            }
            default:
                console.log('Invalid command');
                break;
        }
    }
    else if(commandName==='clear'){
        process.stdout.write('\033c');
    }




})