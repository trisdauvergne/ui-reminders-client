// import {
//     useEffect,
//     useState
// } from 'react';
// import axios from 'axios';
import './header.scss';

const Header = () => {
  //   const [ loaded, setLoaded ] = useState(null);

  // useEffect(() => {
  //   axios.get(`http://localhost:3001/test`)
  //     .then((res) => {
  //       setLoaded(res.data.message);
  //     })
  // }, []);

  return (
    <header>
        <h1 className='header'>UI Reminders</h1>
        {/* <p>{!loaded ? 'Waiting for fart' : loaded}</p> */}
    </header>
  )
}

export default Header