import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdBanner from './AdBanner';

export default function Layout() {
  return (
    <div className="layout">
      <AdBanner position="top" />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <AdBanner position="bottom" />
    </div>
  );
}
