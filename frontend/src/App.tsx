import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
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
            <Route path="/me" element={<Dashboard />} />
            <Route index element={<Homepage />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </QueryClientProvider>
    <section id="watermarks">
      <a
        href="https://theselfdev.com/"
        id="self-dev-watermark"
        className="watermark"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLink} />
        &nbsp;&nbsp;SELF.DEV
      </a>
      <a
        href="https://github.com/selfdevs/accountability-dashboard"
        id="github-watermark"
        className="watermark"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} />
        &nbsp;&nbsp;GitHub
      </a>
    </section>
  </NotificationProvider>
);

export default App;
