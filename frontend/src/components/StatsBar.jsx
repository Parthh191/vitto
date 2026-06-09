export default function StatsBar({ summary }) {
  const stats = [
    { label: "Total apps", value: summary?.totalApplications || 0, variant: "neutral" },
    { label: "Total amount", value: `₹${(summary?.totalLoanAmount || 0).toLocaleString("en-IN")}`, variant: "neutral" },
    { label: "Pending", value: summary?.pending || 0, variant: "yellow" },
    { label: "Approved", value: summary?.approved || 0, variant: "green" },
    { label: "Rejected", value: summary?.rejected || 0, variant: "red" },
  ];

  const styles = {
    neutral: { card: "bg-white border border-gray-100", label: "text-gray-400", value: "text-gray-900" },
    yellow:  { card: "bg-amber-50 border border-amber-200", label: "text-amber-700", value: "text-amber-900" },
    green:   { card: "bg-green-50 border border-green-200", label: "text-green-700", value: "text-green-900" },
    red:     { card: "bg-red-50 border border-red-200",     label: "text-red-700",   value: "text-red-900" },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
      {stats.map(({ label, value, variant }) => {
        const s = styles[variant];
        return (
          <div key={label} className={`${s.card} rounded-xl p-4`}>
            <p className={`text-[11px] font-medium uppercase tracking-wider mb-1.5 ${s.label}`}>
              {label}
            </p>
            <p className={`text-2xl font-semibold ${s.value}`}>{value}</p>
          </div>
        );
      })}
    </div>
  );
}