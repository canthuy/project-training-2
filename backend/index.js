const _ = require("lodash");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3002;

app.use(cors());
app.get("/device_summary", (req, res) => {
  const {startDate, endDate} = req.query;
  const iOSData = _.random(0,50);
  const data = startDate && endDate ? {iOS: iOSData, android: 100-iOSData}: { iOS: 40, android: 60 };
  setTimeout(() => {
    res.send(data);
  }, 10000);
});
app.get("/ranking", (req, res) => {
  const {startDate, endDate} = req.query;
  const data = [
    { label: "Day 1", value: startDate && endDate? _.random(0,20):15 },
    { label: "Day 2", value: startDate && endDate? _.random(0,20):4 },
    { label: "Day 3", value: startDate && endDate? _.random(0,20):10 },
    { label: "Day 4", value: startDate && endDate? _.random(0,20):5 },
    { label: "Day 5", value: startDate && endDate? _.random(0,20):8 },
    { label: "Day 6", value: startDate && endDate? _.random(0,20):10 },
    { label: "Day 7", value: startDate && endDate? _.random(0,20):12 },
  ];
  setTimeout(() => {
    res.send(data);
  }, 5000);
});
app.get("/heat_chart", (req, res) => {
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
    res.send(dataHeat);
  }, 5000);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}\n`);
});
