import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import StatsBar from "../components/StatsBar";
import StatusFilter from "../components/StatusFilter";
import ApplicationsTable from "../components/ApplicationsTable";

const defaultSummary = {
  totalApplications: 0, totalLoanAmount: 0,
  pending: 0, approved: 0, rejected: 0,
};

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState(defaultSummary);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    try {
      const url = status ? `/applications?status=${status}` : "/applications";
      const response = await api.get(url);
      setApplications(response.data.data || []);
    } catch (error) {
      console.error(error);
      setApplications([]);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await api.get("/applications/summary");
      setSummary(response.data.data || defaultSummary);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { fetchApplications(); }, [status]);
  useEffect(() => { fetchSummary(); }, []);

  const filteredApplications = applications.filter((app) => {
    const q = search.toLowerCase();
    return app?.name?.toLowerCase().includes(q) || app?.mobile?.includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-7">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-0.5">
              Overview
            </p>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
              text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New application
          </Link>
        </div>

        {/* Stats */}
        <StatsBar summary={summary} />

        {/* Toolbar */}
        <div className="bg-white border border-gray-100 rounded-xl px-4 py-3
          flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200
                rounded-lg text-gray-900 placeholder-gray-300 focus:outline-none
                focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
            />
          </div>
          <StatusFilter status={status} setStatus={setStatus} />
        </div>

        {/* Table */}
        <ApplicationsTable
          applications={filteredApplications}
          setApplications={setApplications}
          setSummary={setSummary}
        />
      </div>
    </div>
  );
}