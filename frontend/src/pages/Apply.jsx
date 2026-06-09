import ApplicationForm from "../components/ApplicationForm";
import { Link } from "react-router-dom";

export default function Apply() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400">
              Welcome back
            </span>
            <h1 className="text-2xl font-semibold text-gray-900">
              Loan Application Portal
            </h1>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700
              text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z
                   M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z
                   M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z
                   M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Form */}
        <ApplicationForm />

      </div>
    </div>
  );
}