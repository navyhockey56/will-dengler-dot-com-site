const server = require("express")();
const path = require("path");
const serverPort = process.env.PORT || 1234;

server.post("/api/contact", (_request, response) => {
  response.send("Received");
});

server.get("/*.js", function(request, response) {
  const projectRoot = path.resolve(__dirname, '..');
  const script = `${request.params['0']}.js`
  response.sendFile(script, { root: `${projectRoot}/dist/` });
});

server.get('/*', function(_request, response) {
  const projectRoot = path.resolve(__dirname, '..');
  response.sendFile('index.html', { root: `${projectRoot}/dist/` });
});

server.listen(serverPort, () => {
  console.log("Server started on Port:", serverPort);
});
