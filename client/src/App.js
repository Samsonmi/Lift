import React, { useState, useEffect } from 'react';
import Form from './components/form'
import './App.css';

function App() {
  const a = []
  const [apiResponse, setApiResponse] = useState(a);

  useEffect(() => {
    getLiftState();
  }, []);

  function getLiftState() {
    fetch("http://localhost:9000/lift/")
      .then(res => res.json())
      .then(res => {
        setApiResponse(res);
        console.log(res);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h>Lift</h>
        <div>
          Lift State:
          {
            apiResponse.map((lift) => {
              return (
                <Form lift={lift} />
              );
            })
          }
        </div>
      </header>
    </div>
  );
}

export default App;
