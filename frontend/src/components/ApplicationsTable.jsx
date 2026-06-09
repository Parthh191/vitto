import {api} from "../services/api"
export default function ApplicationsTable({
  applications,
  setApplications,
}) {
  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/applications/${id}`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Purpose</th>
            <th className="p-3">Language</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {(applications || []).map((app) => (
            <tr key={app.id} className="border-t">
              <td className="p-3">{app.name}</td>
              <td className="p-3">{app.mobile}</td>
              <td className="p-3">₹{app.amount}</td>
              <td className="p-3">{app.purpose}</td>
              <td className="p-3">{app.language}</td>
              <td className="p-3">{app.status}</td>

              <td className="p-3 flex gap-2">
                <button
                  onClick={() => updateStatus(app.id, "Approved")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(app.id, "Rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}