import React, {
  useEffect,
  useState
} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/test`)
      .then((res) => {
        console.log(res.data);
        setTestData(res.data.message);
      })
  }, []);

  if (!testData) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>{!testData ? `Womp womp` : testData}</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default App;
