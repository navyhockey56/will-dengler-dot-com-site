require('dotenv').config();

const server = require("express")();
const bodyParser = require("body-parser");
const path = require("path");

const sendMail = require("./mailer");

const serverPort = process.env.PORT || 1234;
const projectRoot = path.resolve(__dirname, '..');

// Force HTTPS in production
if (process.env.NODE_ENV == 'production') {
  server.enable('trust proxy');
  server.use(function(request, response, next) {
    if (!request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }
    next();
  });
}

// Enable reading JSON payloads from requests
server.use(bodyParser.json());

server.post("/api/contact", (request, response) => {
  const { email, message } = request.body;
  const body = `${message}\n-------------------\nSent from: ${email}`;
  const onMailSent = () => response.send("Sent.");
  sendMail({ subject: "WillDengler.com", body }, onMailSent);
});

server.get("*.ico", (request, response) => {
  const icon = `${request.params['0']}.ico`
  response.sendFile(icon, { root: `${projectRoot}/dist/` });
});

server.get("/*.js", function(request, response) {
  const script = `${request.params['0']}.js`
  response.sendFile(script, { root: `${projectRoot}/dist/` });
});

server.get('/*', function(_request, response) {
  response.sendFile('index.html', { root: `${projectRoot}/dist/` });
});

server.listen(serverPort, () => {
  console.log("Server started on Port:", serverPort);
});
