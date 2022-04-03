import React from 'react';
import './App.css';
import CreateList from './components/createList/CreateList';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <CreateList />
    </div>
  )
}

export default App;
