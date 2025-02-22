import Sidebar from '@/components/dashboard/sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
