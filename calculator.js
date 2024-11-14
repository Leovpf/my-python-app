const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const { operation, a, b } = query;

    // Serve the HTML form when accessing the root URL
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calculator</title>
            </head>
            <body>
                <h1>Calculator</h1>
                <form action="/" method="get">
                    <label for="a">First Number:</label>
                    <input type="number" name="a" id="a" required>
                    <br><br>

                    <label for="b">Second Number:</label>
                    <input type="number" name="b" id="b" required>
                    <br><br>

                    <label for="operation">Operation:</label>
                    <select name="operation" id="operation">
                        <option value="add">Add</option>
                        <option value="subtract">Subtract</option>
                        <option value="multiply">Multiply</option>
                        <option value="divide">Divide</option>
                    </select>
                    <br><br>

                    <button type="submit">Calculate</button>
                </form>
                <p>Use this form to calculate results directly from the server.</p>
            </body>
            </html>
        `);
        return;
    }

    // Handle the calculation if parameters are provided
    if (operation && a && b) {
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
    } else {
        // Handle missing parameters
        res.writeHead(400);
        res.end("Missing parameters. Provide operation, a, and b.");
    }
});

server.listen(8097, () => {
    console.log('Calculator API is running on port 8097');
});
