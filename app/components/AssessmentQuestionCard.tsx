'use client';

import { useMemo, useState } from 'react';

type OptionState = 'default' | 'warning' | 'invalid';

export type AssessmentOption = {
  id: string;
  title: string;
  description?: string;
  state?: OptionState;
  riskLevel?: 'low' | 'medium' | 'high';
  tags?: string[];
};

type Props = {
  title?: string;
  subtitle?: string;
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: AssessmentOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onSave?: () => void;
  contextTitle?: string;
  contextBody?: string;
  note?: string;
  categoryLabel?: string;
  multiple?: boolean;
  nextLabel?: string;
};

export default function AssessmentQuestionCard({
  title,
  subtitle,
  questionNumber,
  totalQuestions,
  questionText,
  options,
  defaultValue,
  onChange,
  onNext,
  onPrev,
  onSave,
  contextTitle,
  contextBody,
  note,
  categoryLabel,
  multiple,
  nextLabel,
}: Props) {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const progressPercent = useMemo(() => {
    if (!totalQuestions) return 0;
    return Math.min(100, Math.max(0, Math.round((questionNumber / totalQuestions) * 100)));
  }, [questionNumber, totalQuestions]);

  const handleSelect = (id: string) => {
    if (multiple) {
      setSelectedIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
        onChange?.(next.join(','));
        return next;
      });
    } else {
      setValue(id);
      onChange?.(id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        {title && (
        <div className="text-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        )}

        {/* removed in-card progress bar and header per design */}

        {/* compact header row */}
        <div className="mb-2 flex items-center justify-between text-[11px] text-gray-500">
          <div className="inline-flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white font-semibold">
              {questionNumber}
            </span>
            <span>{`Question ${questionNumber} of ${totalQuestions}`}</span>
            <span className="text-red-500">*</span>
          </div>
          {categoryLabel && (
            <span className="hidden sm:block">{categoryLabel}</span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">{questionText}</h3>
        {subtitle && !title && <p className="text-[11px] text-gray-600 mb-5">{subtitle}</p>}

        {(contextTitle || contextBody) && (
          <div className="mb-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="p-4">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-100 text-red-700">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                </div>
                <div className="text-sm">
                  {contextTitle && <div className="font-semibold text-gray-800">{contextTitle}</div>}
                  {contextBody && <p className="mt-1 text-gray-700 text-[12px] sm:text-[13px] leading-5">{contextBody}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {options.map((opt) => {
            const selected = multiple ? selectedIds.includes(opt.id) : value === opt.id;
            const isWarning = opt.state === 'warning';
            const isInvalid = opt.state === 'invalid';
            const border = isInvalid ? 'border-rose-200' : isWarning ? 'border-amber-200' : 'border-gray-200 hover:border-gray-300';
            const bg = selected ? 'bg-red-50/40' : isInvalid ? 'bg-rose-50/50' : isWarning ? 'bg-amber-50/50' : '';
            const riskClasses =
              opt.riskLevel === 'low'
                ? 'border-green-200 bg-green-50 text-green-700'
                : opt.riskLevel === 'medium'
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : opt.riskLevel === 'high'
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : '';
            return (
              <label key={opt.id} className={`block rounded-md border transition-colors cursor-pointer ${border} ${bg}`}>
                <div className="p-4 flex items-start">
                  <input
                    type={multiple ? 'checkbox' : 'radio'}
                    name="assessmentOption"
                    className="mt-1 mr-3 text-red-600 focus:ring-red-600"
                    checked={selected}
                    onChange={() => handleSelect(opt.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${selected ? 'text-gray-900' : 'text-gray-900'}`}>{opt.title}</span>
                      {opt.riskLevel && (
                        <span className={`ml-auto inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${riskClasses}`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                            opt.riskLevel === 'low' ? 'bg-green-500' : opt.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                          {opt.riskLevel} Risk
                        </span>
                      )}
                    </div>
                    {opt.description && (
                      <p className={`text-[11px] mt-1 ${selected ? 'text-gray-700' : 'text-gray-600'}`}>{opt.description}</p>
                    )}
                    {opt.tags && opt.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-gray-600">
                        {opt.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 bg-white">
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 2a2 2 0 00-2 2v1H5a3 3 0 00-3 3v5a3 3 0 003 3h10a3 3 0 003-3V8a3 3 0 00-3-3h-1V4a2 2 0 00-2-2H8zm2 6a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd"/></svg>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {note && (
          <div className="mt-4 text-[11px] text-gray-600 inline-flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Note: {note}</span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <button type="button" className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900" onClick={onSave}>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0017.414 6L14 2.586A2 2 0 0012.586 2H4zm9 3H7V4h6v2z"/></svg>
            Save Progress
          </button>
          <div className="flex gap-3">
            <button type="button" className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={onPrev}>
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              Previous Question
            </button>
            <button type="button" className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed" onClick={onNext} disabled={multiple ? selectedIds.length === 0 : !value}>
              {nextLabel || 'Next Question'}
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




