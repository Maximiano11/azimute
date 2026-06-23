import { Outlet } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Sidebar from './Sidebar.jsx';
import BottomNav from './BottomNav.jsx';

export default function Layout() {
  return (
    <div>
      <Topbar />
      <div className="shell">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
