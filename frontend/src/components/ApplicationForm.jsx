import { useState } from "react";
import { api } from "../services/api";

const languages = ["Hindi", "Tamil", "Telugu", "Marathi", "English"];

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
    purpose: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      const response = await api.post("/applications", payload);

      setReferenceId(response.data.data.id);

      setFormData({
        name: "",
        mobile: "",
        amount: "",
        purpose: "",
        language: "",
      });
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Loan Application
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Applicant Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="purpose"
          placeholder="Loan Purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">Select Language</option>

          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>

      {referenceId && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <p className="font-semibold text-green-700">
            Application Submitted Successfully
          </p>

          <p className="text-sm">
            Reference ID: {referenceId}
          </p>
        </div>
      )}
    </div>
  );
}