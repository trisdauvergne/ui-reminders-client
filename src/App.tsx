import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  Provider,
 } from 'react-redux';
import store from './redux/store';
import './App.scss';
import CreateList from './components/createList/CreateList';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import ViewLists from './components/viewLists/ViewLists';
import ListItem from './components/listItem/ListItem';
import HomeScreen from './components/homeScreen/HomeScreen';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/viewlists" element={<ViewLists />} />
            <Route path="/createlist" element={<CreateList />} />
            <Route path="/viewlist/:id" element={<ListItem />} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
