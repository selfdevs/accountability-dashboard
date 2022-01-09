import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Auth from './contexts/Auth';
import { NotificationProvider } from './contexts/Notification';

const queryClient = new QueryClient();

const App = () => (
  <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth>
          <p id="mobile-disclaimer">
            This app is not available for this screen size
          </p>
          <Routes>
            <Route path="/:username" element={<Dashboard />} />
            <Route index element={<Homepage />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </QueryClientProvider>
  </NotificationProvider>
);

export default App;
