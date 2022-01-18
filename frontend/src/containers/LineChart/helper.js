const handleData = (data) => {
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
  return newData;
};

export { handleData };
