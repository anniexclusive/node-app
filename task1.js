const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>First Task</title></head>');
        res.write('<body><h1>Hello and welcome to my first task</h1>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username" /><button type="submit">Submit</button></form>')
        res.write('</body></html>');
        return res.end();
    }
    
    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>List of dummy users</title></head>');
        res.write('<body><h1>Dummy users</h1>');
        res.write('<ul>');
        res.write('<li>User 1 </li>');
        res.write('<li>User 2 </li>');
        res.write('<li>User 3 </li>');
        res.write('<li>User 4 </li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/create-user' && method === 'POST') {
        const formData = [];
        req.on('data', (chunk) => {
            formData.push(chunk);
        });

        req.on('end', () => {
            const parsedFormData = Buffer.concat(formData).toString();
            const username = parsedFormData.split('=')[1];
            console.log(username);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});

server.listen(3000);