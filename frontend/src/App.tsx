import React from 'react';
import './App.css';
import {
  BrowserRouter, NavLink, Route, Routes,
} from 'react-router-dom';
import ScratchPad from './components/ScratchPad/ScrathPad';
import Table from './components/Table/Table';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/:username"
        element={(
          <div className="layout">
            <Table />
            <div className="flex1">
              <ScratchPad />
            </div>
          </div>
        )}
      />
      <Route index element={<NavLink to="/longlikeshort">Go to longlikeshort dashboard</NavLink>} />
    </Routes>
  </BrowserRouter>
);

export default App;
