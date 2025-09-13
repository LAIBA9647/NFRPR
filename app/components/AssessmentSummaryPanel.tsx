'use client';

type RiskLevel = 'low' | 'medium' | 'high';

type Stat = {
  id: string;
  label: string;
  value: string | number;
};

type LinkItem = {
  id: string;
  label: string;
  href?: string;
};

type Props = {
  answered: number;
  total: number;
  compliancePercent: number; // e.g., 100
  riskLevel: RiskLevel;
  stats?: Stat[];
  links?: LinkItem[];
};

export default function AssessmentSummaryPanel({ answered, total, compliancePercent, riskLevel, stats = [], links = [] }: Props) {
  const remaining = Math.max(0, total - answered);

  const riskTone =
    riskLevel === 'low'
      ? { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700', label: 'Low Risk Level' }
      : riskLevel === 'high'
      ? { border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-700', label: 'High Risk Level' }
      : { border: 'border-amber-200', bg: 'bg-amber-50', text: 'text-amber-800', label: 'Medium Risk Level' };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Assessment Summary</h3>
        <span className="text-xs text-gray-500">Live</span>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg border border-gray-100 p-3">
          <div className="text-2xl font-bold text-green-600">{answered}</div>
          <div className="text-[10px] text-gray-500">Questions Answered</div>
        </div>
        <div className="rounded-lg border border-gray-100 p-3">
          <div className="text-2xl font-bold text-gray-900">{remaining}</div>
          <div className="text-[10px] text-gray-500">Remaining</div>
        </div>
      </div>

      {/* Compliance */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg border border-gray-100 p-3">
          <div className="text-2xl font-bold text-green-600">{compliancePercent}%</div>
          <div className="text-[10px] text-gray-500">Complete</div>
        </div>
        <div className={`rounded-lg border ${riskTone.border} ${riskTone.bg} ${riskTone.text} p-3`}>
          <div className="text-sm font-semibold">{riskTone.label}</div>
        </div>
      </div>

      {/* Quick stats */}
      {stats.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          {stats.map((s) => (
            <div key={s.id} className="rounded-lg border border-gray-100 p-3 text-left">
              <div className="text-gray-500">{s.label}</div>
              <div className="font-semibold text-gray-900 mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Supporting links */}
      {links.length > 0 && (
        <div className="mt-4">
          <ul className="text-[11px] text-gray-600 space-y-1">
            {links.map((l) => (
              <li key={l.id} className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"/></svg>
                {l.href ? (
                  <a className="hover:text-red-600" href={l.href}>{l.label}</a>
                ) : (
                  <span>{l.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 text-[10px] text-gray-400 text-right">Updated: 28/01/2025</div>
    </div>
  );
}



