import React from 'react';
import './App.css';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Auth from './contexts/Auth';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
