import React, {
    useEffect,
    useState
} from 'react';
import axios from 'axios';

const Header = () => {
    const [ loaded, setLoaded ] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/test`)
      .then((res) => {
        console.log(res.data);
        setLoaded(res.data.message);
      })
  }, []);

  return (
    <header>
        <h1>UI Reminders</h1>
        <p>{!loaded ? 'Waiting for fart' : loaded}</p>
    </header>
  )
}

export default Header