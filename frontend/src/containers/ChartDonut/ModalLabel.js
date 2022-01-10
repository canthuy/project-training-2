import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../redux/doughnut/actions';

import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import './ModalLabel.css';

const ModalLabel = () => {
  const [listLabel, setListLabel] = useState([
    'Android',
    'iOS',
    'Windows',
    'Os X',
    'Unknown',
    'Linux',
  ]);
  const [show, setShow] = useState(false);
  const deviceData = useSelector((state) => state.device.deviceData);
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  const [listChecked, setListChecked] = useState(
    deviceData.map((val) => val.x)
  );
  const dispatch = useDispatch();
  const onClickLabel = (val) => {
    setListChecked((prevList) => {
      const isChecked = prevList.includes(val);
      if (isChecked) {
        return prevList.filter((check) => check !== val);
      }
      return [...prevList, val];
    });
  };
  const onHideModal = () => {
    const prevListChecked = deviceData.map((val) => val.x);
    const isTrue =
      listChecked.length === prevListChecked.length &&
      prevListChecked.every((v) => listChecked.includes(v));
    if (listChecked.length > 0) {
      if (!isTrue) {
        dispatch(getData([startDate, endDate, listChecked]));
      } else {
        setShow(false);
      }
    } else {
      alert('Please select device type');
    }
  };
  const handleFilter = (e) => {
    e.preventDefault();
    const keyFilter = e.target.value.trim();
    if (keyFilter.length > 0) {
      setListLabel((prev) => {
        return prev.filter((val) => val.toLowerCase().includes(keyFilter));
      });
    } else {
      setListLabel(['Android', 'iOS', 'Windows', 'Os X', 'Unknown', 'Linux']);
    }
  };
  return (
    <>
      <Button className="btn-labels" size="sm" onClick={() => setShow(true)}>
        Labels
      </Button>
      <Modal
        show={show}
        onHide={onHideModal}
        dialogClassName="modal-custom"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <input className="input-filter" onChange={handleFilter} />
          {listLabel.map((val, index) => {
            return (
              <div
                key={index}
                className="label-os"
                onClick={() => onClickLabel(val)}
              >
                <span>{val}</span>
                {listChecked.includes(val) ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  ''
                )}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalLabel;
