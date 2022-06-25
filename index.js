require('dotenv').config();
const app = require('./server');
const metadata = require('./package.json');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  process.stdout.write(
    `\x1b[0mRunning API v${metadata.version} on port : `,
  );
  process.stdout.write(`\x1b[32m${port}\x1b[0m\n`);
});
