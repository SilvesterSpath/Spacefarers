import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import SpacefarerDetail from './SpacefarerDetail';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/spacefarer/:id' element={<SpacefarerDetail />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);
