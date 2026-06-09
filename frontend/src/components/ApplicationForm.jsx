import { useState } from "react";
import { api } from "../services/api";

const languages = ["Hindi", "Tamil", "Telugu", "Marathi", "English"];

const icons = {
  user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  rupee: "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
  file: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  language: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
};

const inputClass = `w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200
  rounded-lg text-gray-900 placeholder-gray-300
  focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
  focus:bg-white transition-all appearance-none`;

function Field({ label, icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[icon]} />
        </svg>
        {children(inputClass)}
      </div>
    </div>
  );
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: "", mobile: "", amount: "", purpose: "", language: "",
  });
  const [loading, setLoading] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/applications", {
        ...formData,
        amount: Number(formData.amount),
      });
      setReferenceId(response.data.data.id);
      setFormData({ name: "", mobile: "", amount: "", purpose: "", language: "" });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 6l9-3 9 3v6c0 5.25-4.5 8.25-9 9.75C7.5 20.25 3 17.25 3 12V6z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Loan application</h2>
        </div>
        <p className="text-sm text-gray-400 ml-[52px] mb-6">
          Fill in the details below to apply for a loan
        </p>

        <div className="border-t border-gray-100 mb-6" />

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name + Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Applicant name" icon="user">
              {(cls) => (
                <input type="text" name="name" placeholder="Full name"
                  value={formData.name} onChange={handleChange}
                  className={cls} required />
              )}
            </Field>
            <Field label="Mobile number" icon="phone">
              {(cls) => (
                <input type="text" name="mobile" placeholder="+91 XXXXX XXXXX"
                  value={formData.mobile} onChange={handleChange}
                  className={cls} required />
              )}
            </Field>
          </div>

          {/* Amount */}
          <Field label="Loan amount (₹)" icon="rupee">
            {(cls) => (
              <input type="number" name="amount" placeholder="e.g. 50000"
                value={formData.amount} onChange={handleChange}
                className={cls} required />
            )}
          </Field>

          {/* Purpose */}
          <Field label="Loan purpose" icon="file">
            {(cls) => (
              <input type="text" name="purpose" placeholder="e.g. Home renovation, Education..."
                value={formData.purpose} onChange={handleChange}
                className={cls} required />
            )}
          </Field>

          {/* Language */}
          <Field label="Preferred language" icon="language">
            {(cls) => (
              <select name="language" value={formData.language}
                onChange={handleChange} className={cls} required>
                <option value="">Select language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            )}
          </Field>

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 mt-2
              bg-blue-600 hover:bg-blue-700 active:scale-[0.99] hover:cursor-pointer
              text-white text-sm font-medium rounded-xl
              transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Submit application
              </>
            )}
          </button>
        </form>

        {/* Success */}
        {referenceId && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <svg className="w-5 h-5 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800">Application submitted successfully</p>
              <p className="text-xs text-green-600 mt-0.5">Reference ID: {referenceId}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}