'use client';

type Category = {
  id: string;
  title: string;
  completed: number;
  total: number;
  status: 'completed' | 'in_progress' | 'pending';
};

type Props = {
  percent: number; // overall percent complete
  categories: Category[];
  complianceText?: string;
};

export default function AssessmentProgressPanel({ percent, categories, complianceText = '100% Regulatory Compliance' }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round(percent)));

  const iconFor = (status: Category['status']) => {
    if (status === 'completed') {
      return (
        <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.595c.75 1.334-.215 2.996-1.742 2.996H3.48c-1.527 0-2.492-1.662-1.742-2.996L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd"/></svg>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Assessment Progress</h3>
        <span className="text-xs inline-flex items-center gap-1 text-green-600">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" /> On track
        </span>
      </div>

      {/* Overall Progress */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <ul className="space-y-2 text-xs text-gray-700">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {iconFor(c.status)}
                <span>{c.title}</span>
              </div>
              <span className={c.status === 'completed' ? 'text-green-600' : 'text-gray-500'}>
                {c.completed}/{c.total}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Compliance Badge */}
      <div className="mt-4">
        <div className="w-full rounded-md border border-green-200 bg-green-50 text-green-700 text-xs px-3 py-2 inline-flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2l6 3v5c0 4.418-3.582 8-8 8S0 14.418 0 10V5l6-3 2 1 2-1z" clipRule="evenodd"/></svg>
          {complianceText}
        </div>
      </div>
    </div>
  );
}




