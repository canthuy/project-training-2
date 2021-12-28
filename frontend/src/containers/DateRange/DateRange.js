import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getDate } from '../../redux/datepicker/actions';
import moment from 'moment';

import { Label, DateRangeSC } from './DateRange.styles';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRange.css';

const DateRange = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  const [dateRange, setDateRange] = useState([null, null]);
  const [newStartDate, newEndDate] = dateRange;
  console.log('startDate', startDate, 'endDate: ', endDate);
  const handleClick = () => {
    if (
      newStartDate !== null &&
      newEndDate !== null &&
      newStartDate !== startDate ||
      newEndDate !== endDate
    ) {
      dispatch(
        getDate({
          startDate: moment(newStartDate).format('DD/MM/YYYY'),
          endDate: moment(newEndDate).format('DD/MM/YYYY'),
        })
      );
    }
  };
  return (
    <DateRangeSC style={{ display: 'flex' }}>
      <Label>Range</Label>
      <DatePicker
        selectsRange={true}
        startDate={newStartDate}
        endDate={newEndDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        dateFormat="dd/MM/yyyy"
      />
      <Button className="btn-submit-date" size="sm" onClick={handleClick}>
        Ok
      </Button>
    </DateRangeSC>
  );
};

export default DateRange;
