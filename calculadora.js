// calculator.js

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const { operation, a, b } = query;

    if (!operation || !a || !b) {
        res.writeHead(400);
        res.end("Missing parameters. Provide operation, a, and b.");
        return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    let result;

    switch (operation) {
        case 'add':
            result = numA + numB;
            break;
        case 'subtract':
            result = numA - numB;
            break;
        case 'multiply':
            result = numA * numB;
            break;
        case 'divide':
            result = numB !== 0 ? numA / numB : "Cannot divide by zero";
            break;
        default:
            result = "Invalid operation";
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Result: ${result}`);
});

server.listen(8097, () => {
    console.log('Calculator API is running on port 8097');
});
