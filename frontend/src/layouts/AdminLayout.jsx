import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

function AdminLayout({ children, titulo, subtitulo }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <AdminSidebar />

        <div className="min-h-screen flex-1">
          <AdminHeader titulo={titulo} subtitulo={subtitulo} />

          <main className="px-6 py-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;