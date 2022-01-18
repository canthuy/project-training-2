import moment from 'moment';

const handleData = (deviceData, formatType) => {
  const newSeries = deviceData.map((device) => {
    const data = device.data.map((day) => ({
      x: moment(day.x, 'DD/MM/YYYY').format(formatType),
      y: day.y,
    }));
    let obj = {};
    const newData = data.reduce((totalY, day) => {
      if (!obj[day.x]) {
        obj[day.x] = day;
        totalY.push(obj[day.x]);
      } else {
        obj[day.x].y += day.y;
      }
      return totalY;
    }, []);
    return {
      name: device.name,
      data: newData,
    };
  });
  return newSeries;
};

export { handleData };
