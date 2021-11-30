import ChartDoughnut from "./components/Chart";
import {useEffect, useState} from 'react';


function App() {
  const [title, setTitle] = useState('')

  useEffect(()=>{
    const callAPI = () => {
      fetch('http://localhost:3002/hello')
        .then(response => {
           return response.json()
        })
        .then(data => {
          setTitle(data)
        })
        .catch(err => {
          console.log(err);
        })
    }
    callAPI()
  }, [])
  
  return (
    <div>
      <ChartDoughnut />
    </div>
  );
}

export default App;
