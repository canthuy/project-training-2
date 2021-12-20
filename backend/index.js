const http = require("http");
var _ = require("lodash");
const host = "localhost";
const port = 3002;

const requestListener = function (req, res) {
  switch (req.url) {
    case "/hello":
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200);
      res.end(JSON.stringify("Hello World!"));
      break;
    case "/device_summary":
      setTimeout(() => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify({ iOS: 40, android: 60 }));
      }, 10000);
      break;
    case "/ranking":
      const data = [
        { label: "Day 1", value: 15 },
        { label: "Day 2", value: 4 },
        { label: "Day 3", value: 10 },
        { label: "Day 4", value: 5 },
        { label: "Day 5", value: 8 },
        { label: "Day 6", value: 10 },
        { label: "Day 7", value: 12 },
      ];
      setTimeout(() => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify(data));
      }, 5000);
      break;
    case "/heat_chart":
      const dataHeat = _.map(
        [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        (day) => ({
          name: day,
          data: _.map(_.range(0, 24), (time) => ({
            x: `${time}:00`,
            y: _.random(0, 2) !== 2 ? _.random(0, 30) : _.random(0, 50),
          })),
        })
      );
      setTimeout(() => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.end(JSON.stringify(dataHeat));
      }, 5000);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify("Resource not found"));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}\n`);
});
