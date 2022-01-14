const _ = require("lodash");
const express = require("express");
const cors = require("cors");
const moment = require("moment");
const app = express();
const port = 3002;

app.use(cors());
app.get("/device_summary", (req, res) => {
  const { device_types } = req.query;
  const data = [
    { x: "Android", y: _.random(0, 100) },
    { x: "Windows", y: _.random(0, 100) },
    { x: "iOS", y: _.random(0, 100) },
    { x: "Os X", y: _.random(0, 100) },
    { x: "Unknown", y: _.random(0, 100) },
    { x: "Linux", y: _.random(0, 100) },
  ];
  const dataRes = device_types
    ? data.map((val) => {
        return device_types.includes(val.x) ? val : "";
      })
    : data;
  setTimeout(() => {
    res.send(dataRes.filter((val) => val !== ""));
  }, 1000);
});
app.get("/ranking", (req, res) => {
  const { startDate, endDate } = req.query;
  const data = [
    { label: "Day 1", value: startDate && endDate ? _.random(0, 20) : 15 },
    { label: "Day 2", value: startDate && endDate ? _.random(0, 20) : 4 },
    { label: "Day 3", value: startDate && endDate ? _.random(0, 20) : 10 },
    { label: "Day 4", value: startDate && endDate ? _.random(0, 20) : 5 },
    { label: "Day 5", value: startDate && endDate ? _.random(0, 20) : 8 },
    { label: "Day 6", value: startDate && endDate ? _.random(0, 20) : 10 },
    { label: "Day 7", value: startDate && endDate ? _.random(0, 20) : 12 },
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
app.get("/device_by_day", (req, res) => {
  const { startDate, endDate } = req.query;
  const dataLineChart = _.map(["Android", "iOS"], (device) => {
    if (startDate && endDate) {
      const data = [];
      let date = startDate;
      while (date !== endDate) {
        data.push({ x: date, y: _.random(0, 20) });
        date = moment(date, "DD/MM/YYYY").add(1, "days").format("DD/MM/YYYY");
      }
      data.push({ x: date, y: _.random(0, 20) });
      return {
        name: device,
        data,
      };
    } else {
      const today = new Date();
      const month = moment(today).subtract(1, "months").format("MM/YYYY");
      const daysInMonth = moment(month, "MM/YYYY").daysInMonth();
      return {
        name: device,
        data: _.map(_.range(0, daysInMonth), (day) => ({
          x: `${day + 1}/${month}`,
          y: _.random(0, 20),
        })),
      };
    }
  });
  setTimeout(() => {
    res.send(dataLineChart);
  }, 700);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}\n`);
});
