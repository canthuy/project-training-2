import { handleData } from '../helper';
it('LineChart/helper', () => {
  const deviceData = [
    {
      name: 'Android',
      data: [
        { x: '01/01/2021', y: 5 },
        { x: '02/01/2021', y: 10 },
        { x: '03/01/2021', y: 5 },
        { x: '01/02/2021', y: 4 },
        { x: '02/02/2021', y: 6 },
      ],
    },
    {
      name: 'iOS',
      data: [
        { x: '01/01/2021', y: 2 },
        { x: '02/01/2021', y: 3 },
        { x: '03/01/2021', y: 5 },
        { x: '01/02/2021', y: 10 },
        { x: '02/02/2021', y: 5 },
      ],
    },
  ];
  const results = handleData(deviceData, 'MM/YYYY');
  expect(results[0].data).toHaveLength(2);
  expect(results[0].data[0].y).toEqual(20);
});
