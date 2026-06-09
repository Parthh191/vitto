import ApplicationForm from "../components/ApplicationForm";
import { Link } from "react-router-dom";

export default function Apply() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Loan Application Portal
          </h1>

          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Dashboard
          </Link>
        </div>

        <ApplicationForm />
      </div>
    </div>
  );
}