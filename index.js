require('dotenv').config();
const app = require('./server.js');
const metadata = require('./package.json');
// Setup server port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  process.stdout.write('\x1b[0m');
  process.stdout.write(`Running API v${metadata.version} on port : `);
  process.stdout.write('\x1b[32m%s\x1b[0m', port);
});
