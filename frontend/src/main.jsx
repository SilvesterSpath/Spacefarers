import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import SpacefarerDetail from './screens/SpacefarerDetail';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProviderComponent } from './context/ThemeProvider';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster />
    <ThemeProviderComponent>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/spacefarer/:id' element={<SpacefarerDetail />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProviderComponent>
  </>
);
