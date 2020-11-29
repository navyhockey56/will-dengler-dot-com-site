const server = require("express")();

const serverPort = process.env.SERVER_PORT || 1234;

server.post("/api/contact", (_request, response) => {
  response.send("Received");
});

server.listen(serverPort, () => {
  console.log("Server started on Port:", serverPort);
});
