import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Auth from './contexts/Auth';

const App = () => (
  <BrowserRouter>
    <Auth>
      <Routes>
        <Route
          path="/:username"
          element={<Dashboard />}
        />
        <Route index element={<Homepage />} />
      </Routes>
    </Auth>
  </BrowserRouter>
);

export default App;
