import { Spinner } from 'react-bootstrap';
import {SpinnerSC} from './Loading.styles';

const Loading = () => {
  return (
    <SpinnerSC>
      <Spinner animation="border" />
    </SpinnerSC>
  );
};

export default Loading;
