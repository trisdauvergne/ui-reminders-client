import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import CreateList from './components/createList/CreateList';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import ViewLists from './components/viewLists/ViewLists';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        {/* <Link to="/viewlists">View lists</Link>
        <Link to="/createlist">Create list</Link> */}
        <Routes>
          <Route path="/viewlists" element={<ViewLists />} />
          <Route path="/createlist" element={<CreateList />} />
        </Routes>
        {/* <CreateList />
        <ViewLists /> */}

      </div>
    </BrowserRouter>
  )
}

export default App;
