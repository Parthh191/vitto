export default function StatsBar({ summary }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-gray-500">Total Apps</h3>
        <p className="text-2xl font-bold">
          {summary?.totalApplications || 0}
        </p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-gray-500">Total Amount</h3>
        <p className="text-2xl font-bold">
          ₹{summary?.totalLoanAmount || 0}
        </p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-xl">
        <h3>Pending</h3>
        <p className="text-2xl font-bold">
          {summary?.pending || 0}
        </p>
      </div>

      <div className="bg-green-100 p-4 rounded-xl">
        <h3>Approved</h3>
        <p className="text-2xl font-bold">
          {summary?.approved || 0}
        </p>
      </div>

      <div className="bg-red-100 p-4 rounded-xl">
        <h3>Rejected</h3>
        <p className="text-2xl font-bold">
          {summary?.rejected || 0}
        </p>
      </div>
    </div>
  );
}