// import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  // Provider,
  useSelector
 } from 'react-redux';
// import store from './redux/store';
import './App.scss';
import CreateList from './components/createList/CreateList';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import ViewLists from './components/viewLists/ViewLists';
import ListItem from './components/listItem/ListItem';
import HomeScreen from './components/homeScreen/HomeScreen';
import AlertModal from './components/alertModal/AlertModal';
import { selectAlertModal } from './redux/modalSlice';

const App = () => {
  const alertModalVisible = useSelector(selectAlertModal);

  return (
    // <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          {alertModalVisible && <AlertModal />}
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
    // </Provider>
  )
}

export default App;
