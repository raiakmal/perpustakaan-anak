export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-gray-700">You do not have permission to access this page.</p>
      </div>
    </div>
  );
}
