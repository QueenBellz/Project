const http = require('http');
const fs = require('fs');
const path = require('path');
const { error, Console } = require('console');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/'? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === '') filePath += '.html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
            // Page not found
            fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
                res.writeHead(404, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            });
        } else {
            // Some server error
            res.writeHead(500)
            res.end('Server Error: ${err.code}');
        }
    } else {
        // Success
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8')
    }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log('Server running on http://localhost:8080')
})