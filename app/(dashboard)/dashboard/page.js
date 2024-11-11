import Body from '@/components/dashboard/body';
import Sidebar from '@/components/dashboard/sidebar';

const Page = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard */}
      <div className="w-full p-2">
        <Body />
      </div>
    </div>
  );
};

export default Page;
