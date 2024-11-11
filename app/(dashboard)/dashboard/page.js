import Sidebar from '@/components/dashboard/sidebar';

const Page = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard */}
      <div className="w-full p-8">Hello Admin!!!</div>
    </div>
  );
};

export default Page;
