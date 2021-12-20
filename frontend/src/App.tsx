import React from 'react';
import './App.css';
import ScratchPad from './components/ScratchPad/ScrathPad';
import Table from './components/Table/Table';

const App = () => (
  <div className="layout">
    <Table />
    <div>
      <ScratchPad />
    </div>
  </div>
);

export default App;
