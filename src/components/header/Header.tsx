import { useNavigate } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const navigate = useNavigate();

  const loadHomeScreen = () => {
    navigate('/');
  };

  return (
    <header>
        <h1 onClick={loadHomeScreen} className='header'>UI Reminders</h1>
    </header>
  )
}

export default Header