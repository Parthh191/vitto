import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

import StatsBar from "../components/StatsBar";
import StatusFilter from "../components/StatusFilter";
import ApplicationsTable from "../components/ApplicationsTable";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({
    totalApplications: 0,
    totalLoanAmount: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  // applications API
  const fetchApplications = async () => {
    try {
      let url = "/applications";

      if (status) url += `?status=${status}`;

      const response = await api.get(url);

      setApplications(response.data.data || []);
    } catch (error) {
      console.log(error);
      setApplications([]);
    }
  };

  // summary API
  const fetchSummary = async () => {
    try {
      const response = await api.get("/applications/summary");

      setSummary(
        response.data.data || {
          totalApplications: 0,
          totalLoanAmount: 0,
          pending: 0,
          approved: 0,
          rejected: 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [status]);

  useEffect(() => {
    fetchSummary();
  }, []);

  // FILTER
  const filteredApplications = (applications || []).filter((app) => {
    const query = search.toLowerCase();

    return (
      app?.name?.toLowerCase().includes(query) ||
      app?.mobile?.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            New Application
          </Link>
        </div>

        <StatsBar summary={summary} />

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search by name or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3 w-full md:w-96"
          />

          <StatusFilter status={status} setStatus={setStatus} />
        </div>

        <ApplicationsTable
          applications={filteredApplications}
          setApplications={setApplications}
        />
      </div>
    </div>
  );
}