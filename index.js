require('dotenv').config()
const app = require('./server.js')
const package = require('./package.json');
// Setup server port
var port = process.env.PORT || 8080;

app.listen(port, function () {
    process.stdout.write('\x1b[0m');
    process.stdout.write(`Running API v${package.version} on port : `)
    console.log('\x1b[32m%s\x1b[0m', port);
});
