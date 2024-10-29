import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { JournalPage } from './pages/Journal';
import { PsychometricPage } from './pages/Psychometric';
import { SubscriptionPage } from './pages/Subscription';
import { Layout } from './components/Layout';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />
        
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/journal"
            element={
              isAuthenticated ? <JournalPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/psychometric"
            element={
              isAuthenticated ? <PsychometricPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/subscription"
            element={
              isAuthenticated ? <SubscriptionPage /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;