import { useState } from "react";
import { api } from "../services/api";

const statusConfig = {
  Pending:  { dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-800 border border-amber-200" },
  Approved: { dot: "bg-green-500",  badge: "bg-green-50 text-green-800 border border-green-200" },
  Rejected: { dot: "bg-red-400",    badge: "bg-red-50 text-red-800 border border-red-200" },
};

export default function ApplicationsTable({ applications, setApplications, setSummary }) {
  const [loadingId, setLoadingId] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);
      const response = await api.patch(`/applications/${id}`, { status });
      const { applications: updatedApps, summary } = response.data.data;
      setApplications(updatedApps);
      setSummary(summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  if (!applications?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
        <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-sm text-gray-400">No applications found</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Name", "Mobile", "Amount", "Purpose", "Language", "Status", "Action"].map((h) => (
                <th key={h}
                  className="px-4 py-3 text-left text-[11px] font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => {
              const cfg = statusConfig[app.status] || statusConfig.Pending;
              const isLoading = loadingId === app.id;
              return (
                <tr key={app.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    i === applications.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{app.name}</td>
                  <td className="px-4 py-3 text-gray-500 tabular-nums">{app.mobile}</td>
                  <td className="px-4 py-3 text-gray-700 tabular-nums font-medium">
                    ₹{Number(app.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{app.purpose}</td>
                  <td className="px-4 py-3 text-gray-500">{app.language}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {app.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(app.id, "Approved")}
                          disabled={isLoading}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                            bg-green-50 text-green-800 border border-green-200 rounded-lg hover:cursor-pointer
                            hover:bg-green-100 disabled:opacity-50 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {isLoading ? "..." : "Approve"}
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, "Rejected")}
                          disabled={isLoading}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium
                            bg-red-50 text-red-800 border border-red-200 rounded-lg hover:cursor-pointer
                            hover:bg-red-100 disabled:opacity-50 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {isLoading ? "..." : "Reject"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}