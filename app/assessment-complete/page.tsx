'use client';

import Link from 'next/link';

// Reusable Stepper Component
interface Step {
  id: number;
  label: string;
  subLabel: string;
  icon?: 'check' | 'chart' | 'document' | 'plus';
}

interface StepperProps {
  steps: Step[];
  activeStep: number;
  progress: { current: number; total: number };
  estimatedTime: number;
  certificationBadge: string;
}

function Stepper({ steps, activeStep, progress, estimatedTime, certificationBadge }: StepperProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, idx) => {
            const isCompleted = step.id < activeStep;
            const isCurrent = step.id === activeStep;
            const isPending = step.id > activeStep;
            
            let circleClass = 'border-gray-300 text-gray-400';
            let circleInner = <span className="text-sm font-semibold">{step.id}</span>;
            
            if (isCompleted) {
              circleClass = 'border-green-600 bg-green-600 text-white';
              circleInner = (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              );
            } else if (isCurrent) {
              circleClass = 'border-red-600 bg-red-600 text-white border-2 border-blue-200';
              circleInner = (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              );
            } else if (isPending) {
              circleClass = 'border-gray-300 text-gray-400';
              if (step.icon === 'chart') {
                circleInner = (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" clipRule="evenodd" />
                  </svg>
                );
              } else if (step.icon === 'document') {
                circleInner = (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                );
              } else if (step.icon === 'plus') {
                circleInner = (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 00-1 1v5H5a1 1 0 000 2h3v7a1 1 0 102 0V10h3a1 1 0 000-2h-3V3a1 1 0 00-1-1z" />
                  </svg>
                );
              }
            }

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${circleClass}`}>
                    {circleInner}
                  </div>
                  <div className="mt-3 text-center">
                    <div className={`text-sm font-medium ${
                      isCurrent ? 'text-gray-900 font-semibold' : 
                      isCompleted ? 'text-gray-900' : 
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{step.subLabel}</div>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-6 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <span>Progress: {progress.current} of {progress.total} steps completed</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 4a1 1 0 10-2 0v4a1 1 0 00.293.707l2.5 2.5a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Estimated time remaining: {estimatedTime} minutes</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{certificationBadge}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentCompletePage() {
  // Define the steps for the stepper
  const steps: Step[] = [
    { id: 1, label: 'Welcome', subLabel: 'Step 1' },
    { id: 2, label: 'Fire Safety Questions', subLabel: 'Step 2' },
    { id: 3, label: 'Assessment Complete', subLabel: 'Step 3' },
    { id: 4, label: 'Assessment Results', subLabel: 'Step 4', icon: 'chart' },
    { id: 5, label: 'PDF Report Preview', subLabel: 'Step 5', icon: 'document' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214-.33-.501-.63-.822-.88a1 1 0 00-1.45.385C6.345 3.428 6 4.16 6 5v6a4 4 0 00-2 3.465V19a1 1 0 102 0v-4.535A2 2 0 018 15V5c0-.334.088-.666.255-.961l.006-.01.007-.01a2 2 0 01.896-.806l.01-.004.017-.006a4.5 4.5 0 011.8 0l.017.006.01.004a2 2 0 01.896.806l.007.01.006.01c.167.295.255.627.255.961v10a2 2 0 01-2 2v4a1 1 0 102 0v-4.535A4 4 0 0014 11V5c0-.84-.345-1.572-.605-2.447z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">NFRPR</span>
                <div className="text-xs text-gray-600 -mt-1">National Fire Risk Prevention Report</div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', href: '/', icon: 'home' },
                { name: 'Assessment', href: '/assessment', icon: 'clipboard' },
                { name: 'Results', href: '/results', icon: 'chart' },
                { name: 'Reports', href: '/reports', icon: 'document' },
                { name: 'More', href: '/more', icon: 'dots' }
              ].map((item) => (
                <Link key={item.name} href={item.href} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                  {item.icon === 'home' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  )}
                  {item.icon === 'clipboard' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === 'chart' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === 'document' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  )}
                  {item.icon === 'dots' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  )}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Stepper - Attached to Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stepper
          steps={steps}
          activeStep={3}
          progress={{ current: 2, total: 5 }}
          estimatedTime={6}
          certificationBadge="UK Compliance Certified"
        />
          </div>
    </div>
  );
}

