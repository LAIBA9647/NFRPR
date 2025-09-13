'use client';

import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState('');

  useEffect(() => {
    async function gen() {
      try {
        setLoading(true);
        setError(null);
        // Demo payload; replace with real state from your store/progress API
        const payload = {
          summary: { answered: 8, total: 8, percent: 72 },
          highLevel: { overallRiskCategory: 'Medium Risk', percentScore: 72, meta: { site: 'Demo Site' } },
          answers: [],
          questions: [],
        };
        const res = await fetch('/api/reports/gemini', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.message || 'Generation failed');
        setReport(json.report);
      } catch (e: any) {
        setError(e?.message || 'Failed to load report');
      } finally {
        setLoading(false);
      }
    }
    gen();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Results</h1>
      {loading && <div className="text-sm text-gray-600">Generating report…</div>}
      {error && <div className="text-sm text-rose-700">{error}</div>}
      {!loading && !error && (
        <article className="prose prose-sm sm:prose text-gray-900 whitespace-pre-wrap">
          {report || 'Report will appear here.'}
        </article>
      )}
    </main>
  );
}




