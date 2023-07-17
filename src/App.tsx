
import logo from './logo.svg';
import './App.css';

import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import DeviceConnect from './components/device-connect/DeviceConnect';
import Context from './config/Context';
import { Socket } from './config/Socket';
import { useEffect, useState } from 'react';

const socket = Socket;
socket.connect();






function App() {





  return (


    <div className="App">

      <Context.Provider value={{ socketActive: socket, devicesActives: [] }}>
        <Router>
          <div className="header"></div>
          <div className="body">
            <Routes>
              <Route path="/device" element={<DeviceConnect />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <Sidebar></Sidebar>

        </Router>
      </Context.Provider>
    </div >


  )
}

export default App;
