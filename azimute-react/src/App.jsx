import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import Landing from './pages/Landing.jsx';
import Auth from './pages/Auth.jsx';
import MapPage from './pages/MapPage.jsx';
import Alerts from './pages/Alerts.jsx';
import Ica from './pages/Ica.jsx';
import Community from './pages/Community.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/app"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/app/map" replace />} />
        <Route path="map" element={<MapPage />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="ica" element={<Ica />} />
        <Route path="community" element={<Community />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
