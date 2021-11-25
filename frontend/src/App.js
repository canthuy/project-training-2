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
      <h1>{title}</h1>
    </div>
  );
}

export default App;
