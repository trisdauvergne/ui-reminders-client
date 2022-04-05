import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import CreateList from './components/createList/CreateList';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import ViewLists from './components/viewLists/ViewLists';
import Modal from './components/modal/Modal';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Navbar />
          <Routes>
            <Route path="/viewlists" element={<ViewLists />} />
            <Route path="/createlist" element={<CreateList />} />
          </Routes>
          <Modal />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
