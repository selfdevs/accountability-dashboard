import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/:username"
        element={<Dashboard />}
      />
      <Route index element={<Homepage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
