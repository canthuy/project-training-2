
const http = require("http");
const host = 'localhost';
const port = 3002;

const requestListener = function (req, res) {
  switch(req.url){
    case '/hello':
      res.setHeader('Content-Type', 'application/json');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200);
      res.end(JSON.stringify("Hello World!"))
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify("Resource not found"));
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, ()=>{
  console.log(`Server is running on http://${host}:${port}\n`);

});
