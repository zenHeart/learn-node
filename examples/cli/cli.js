#!/usr/bin/env node

const readline = require('readline')

console.log(process.argv)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'send data> '
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case 'exit':
            rl.close();
            break;
        default:
            console.log(`receive: '${line.trim()}'`);
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});