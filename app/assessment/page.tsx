'use client';

import AssessmentQuestionCard from '../components/AssessmentQuestionCard';
import AssessmentProgressPanel from '../components/AssessmentProgressPanel';
import AssessmentSummaryPanel from '../components/AssessmentSummaryPanel';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function AssessmentPage() {
  const userId = 'demo-user';
  const [questions, setQuestions] = useState<any[]>([]);
  const [progress, setProgress] = useState<{ answers: any[] }>({ answers: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const [qsRes, progRes] = await Promise.all([
        fetch('/api/questions').then(r => r.json()),
        fetch(`/api/questions/progress/${userId}`).then(r => r.json())
      ]);
      if (!mounted) return;
      setQuestions(qsRes || []);
      setProgress(progRes || { answers: [] });
      // Move to first unanswered question
      const answeredIds = new Set((progRes?.answers || []).map((a: any) => a.questionId));
      const firstUnanswered = (qsRes || []).findIndex((q: any) => !answeredIds.has(q.questionId));
      setCurrentIndex(firstUnanswered === -1 ? 0 : firstUnanswered);
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const summary = useMemo(() => {
    const total = questions.length;
    const answered = new Set((progress.answers || []).map((a: any) => a.questionId)).size;
    const percent = total === 0 ? 0 : Math.round((answered / total) * 100);
    return { total, answered, percent };
  }, [questions, progress]);

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

  const steps: Step[] = [
    { id: 1, label: 'Welcome', subLabel: 'Step 1' },
    { id: 2, label: 'Fire Safety Questions', subLabel: 'Step 2' },
    { id: 3, label: 'Assessment Complete', subLabel: 'Step 3', icon: 'plus' },
    { id: 4, label: 'Assessment Results', subLabel: 'Step 4', icon: 'chart' },
    { id: 5, label: 'PDF Report Preview', subLabel: 'Step 5', icon: 'document' },
  ];

  // Determine current step based on assessment progress
  const completedSteps = (progress as any).completedSteps || [];
  const answeredCount = (progress.answers || []).length;
  const totalQuestions = questions.length;
  
  // Step logic:
  // Step 1: Welcome (completed when user starts assessment)
  // Step 2: Fire Safety Questions (current when answering questions)
  // Step 3: Assessment Complete (only red when user clicks "Complete Assessment")
  // Step 4: Assessment Results (pending)
  // Step 5: PDF Report Preview (pending)
  
  let currentStep = 1;
  let completedStepsList = [];
  
  if (answeredCount > 0) {
    completedStepsList.push(1); // Welcome is completed
  }
  
  if (answeredCount > 0 && answeredCount < totalQuestions) {
    currentStep = 2; // Currently answering questions
  } else if (answeredCount >= totalQuestions) {
    completedStepsList.push(2); // Questions completed
    if (assessmentCompleted) {
      currentStep = 3; // Assessment complete - only when user clicks "Complete Assessment"
    } else {
      currentStep = 2; // Still on step 2 until user clicks "Complete Assessment"
    }
  }

  const handleAnswer = async (optionId: string) => {
    const q = questions[currentIndex];
    if (!q) return;
    await fetch('/api/questions/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, questionId: q.questionId, optionId, state: 'selected' })
    });
    const updated = await fetch(`/api/questions/progress/${userId}`).then(r => r.json());
    setProgress(updated);
    
    // Check if this was the last question
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      // All questions completed, but don't redirect yet - wait for user to click "Complete Assessment"
      setAssessmentCompleted(true);
    } else {
      // Move to next question
      setCurrentIndex(nextIndex);
    }
  };

  const handleCompleteAssessment = () => {
    // User clicked "Complete Assessment" - now redirect to completion page
    window.location.href = '/assessment-complete';
  };

  // Build UI content for the current question to match exact copy and layout
  const buildUiForQuestion = (q: any) => {
    const base = {
      categoryLabel: q?.category || 'Building Information',
      subtitle: '',
      contextTitle: 'UK Fire Safety Context',
      contextBody: '',
      note: undefined as string | undefined,
      options: [] as any[],
    };
    if (q?.questionId === 'q2') {
      base.subtitle = 'Select the height category that best describes your building.';
      base.contextBody =
        'Building height significantly impacts fire safety requirements under UK regulations. Buildings over 18 metres have additional requirements following the Building Safety Act 2022.';
      base.options = [
        { id: 'single_storey', title: 'Single storey (ground floor only)', description: 'No upper floors or basement levels', riskLevel: 'low' },
        { id: 'low_rise', title: 'Low-rise (2–4 storeys)', description: 'Up to 4 floors including ground floor', riskLevel: 'low' },
        { id: 'medium_rise', title: 'Medium-rise (5–10 storeys)', description: '5 to 10 floors including ground floor', riskLevel: 'medium' },
        { id: 'high_rise', title: 'High-rise (11+ storeys or over 18m)', description: 'Buildings over 18 metres in height', riskLevel: 'high', tags: ['Building Safety Act 2022'] },
      ];
    } else if (q?.questionId === 'q1') {
      base.subtitle = 'Select the primary use classification for this building.';
      base.contextBody =
        'Under UK fire safety regulations, different building types have specific requirements. Residential buildings follow different standards than commercial or industrial premises.';
      base.options = [
        { id: 'single', title: 'Single family residential dwelling', description: 'Houses, bungalows, and similar single-occupancy homes', riskLevel: 'low', tags: ['Building Regulation Part B'] },
        { id: 'multi', title: 'Multi occupancy residential building', description: 'Flats, apartments, HMOs with shared facilities', riskLevel: 'medium', tags: ['Housing Act 2004', 'Fire Safety Order 2005'] },
        { id: 'office', title: 'Commercial office building', description: 'Offices, business premises, professional services', riskLevel: 'medium', tags: ['Fire Safety Order 2005'] },
        { id: 'retail', title: 'Retail or hospitality premises', description: 'Shops, restaurants, pubs, hotels', riskLevel: 'high', tags: ['Fire Safety Order 2005', 'Licensing Act 2003'] },
        { id: 'industrial', title: 'Industrial or warehouse facility', description: 'Manufacturing, storage, distribution centres', riskLevel: 'high', tags: ['Fire Safety Order 2005 & DSEAR Regulations'] },
      ];
      base.note = 'Building classification affects the specific fire safety requirements and inspection frequency.';
    } else if (q?.questionId === 'q3') {
      base.categoryLabel = 'Occupancy Assessment';
      base.subtitle = 'Estimate the maximum number of people who could be in the building at any time.';
      base.contextBody = 'Occupancy levels determine evacuation requirements, exit widths, and fire safety equipment needs under UK fire safety legislation.';
      base.options = [
        { id: 'very_small', title: 'Very small (1–10 people)', description: 'Small offices, single dwellings, small shops', riskLevel: 'low' },
        { id: 'small', title: 'Small (11–50 people)', description: 'Small businesses, restaurants, small offices', riskLevel: 'low' },
        { id: 'medium', title: 'Medium (51–200 people)', description: 'Larger offices, schools, medium retail premises', riskLevel: 'medium' },
        { id: 'large', title: 'Large (201–500 people)', description: 'Large offices, shopping centres, hotels', riskLevel: 'medium' },
        { id: 'very_large', title: 'Very large (500+ people)', description: 'Major venues, large shopping centres, stadiums', riskLevel: 'high' },
      ];
    } else if (q?.questionId === 'q4') {
      base.categoryLabel = 'Fire Safety Systems';
      base.subtitle = 'Select all fire detection and alarm systems currently in place.';
      base.contextBody = 'UK fire safety regulations require appropriate detection systems based on building type and risk level. BS 5839 provides the classification of fire alarm systems.';
      base.options = [
        { id: 'smoke', title: 'Smoke detectors/alarms', description: 'Typically optical or ionisation devices', riskLevel: 'low' },
        { id: 'heat', title: 'Heat detectors', description: 'Rate-of-rise or fixed-temperature heat detectors', riskLevel: 'low' },
        { id: 'manual', title: 'Manual fire alarm call points', description: 'Break-glass units for manual activation', riskLevel: 'medium' },
        { id: 'afss', title: 'Automatic fire alarm system', description: 'Grade and category vary by building use', riskLevel: 'medium' },
        { id: 'sprinkler', title: 'Automatic sprinkler system', description: 'Wet/dry pipe, residential or commercial systems', riskLevel: 'medium' },
        { id: 'none', title: 'No fire detection system', description: 'High risk', riskLevel: 'high' },
      ];
      // Single selection only across all questions
    } else if (q?.questionId === 'q5') {
      base.categoryLabel = 'Means of Escape';
      base.subtitle = 'Assess the adequacy of escape routes, exit signage, and emergency lighting.';
      base.contextBody = 'Adequate means of escape are fundamental to UK fire safety. All escape routes must be clearly marked, unobstructed, and lead to a place of ultimate safety.';
      base.options = [
        { id: 'excellent', title: 'Excellent - Multiple clear routes, good signage', description: 'Multiple escape routes, clear signage, emergency lighting, unobstructed paths', riskLevel: 'low' },
        { id: 'good', title: 'Good - Adequate routes with minor issues', description: 'Sufficient escape routes with some minor signage or lighting issues', riskLevel: 'low' },
        { id: 'fair', title: 'Fair - Some routes but improvements needed', description: 'Basic escape provision but requires improvements to signage or lighting', riskLevel: 'medium' },
        { id: 'poor', title: 'Poor - Limited routes, unclear signage', description: 'Insufficient escape routes, poor signage, or obstructed paths', riskLevel: 'high' },
        { id: 'very_poor', title: 'Very poor - Inadequate or blocked routes', description: 'Seriously inadequate escape provision, blocked routes, no signage', riskLevel: 'high' },
      ];
      base.note = 'Escape routes must comply with Building Regulations Approved Document B.';
    } else if (q?.questionId === 'q6') {
      base.categoryLabel = 'Fire Safety Management';
      base.subtitle = 'Select all fire safety management activities currently implemented.';
      base.contextBody = 'UK Fire Safety Order requires adequate management systems including risk assessments, training, and records. Effective management underpins daily compliance.';
      base.options = [
        { id: 'written_risk_assessment', title: 'Written fire risk assessment', description: 'Documented assessment updated regularly', riskLevel: 'low' },
        { id: 'drills', title: 'Routine fire drills / evacuations', description: 'Scheduled drills with recorded outcomes', riskLevel: 'low' },
        { id: 'training', title: 'Regular staff fire safety training', description: 'Inductions and refreshers for all staff', riskLevel: 'medium' },
        { id: 'logbook', title: 'Fire logbook / records and checks', description: 'Maintenance, testing, and weekly checks recorded', riskLevel: 'medium' },
        { id: 'responsible_person', title: 'Responsible Person (RP) appointed', description: 'Named competent person managing duties', riskLevel: 'medium' },
        { id: 'none', title: 'No formal fire safety management', description: 'High risk', riskLevel: 'high' },
      ];
      // remain single-select per requirement
    } else if (q?.questionId === 'q7') {
      base.categoryLabel = 'Vulnerable Persons';
      base.subtitle = 'Consider people with mobility issues, hearing/visual impairments, or other needs.';
      base.contextTitle = 'UK Fire Safety Context';
      base.contextBody = 'UK equality legislation and fire safety guidance require special consideration for people who may need assistance during emergency evacuation.';
      base.options = [
        { id: 'none_identified', title: 'No vulnerable persons identified', description: 'All occupants can evacuate independently', riskLevel: 'low' },
        { id: 'few_with_peeps', title: 'Few vulnerable persons with evacuation plans', description: 'Small number with documented Personal Emergency Evacuation Plans (PEEPs)', riskLevel: 'low' },
        { id: 'some_with_peeps', title: 'Some vulnerable persons with evacuation plans', description: 'Moderate number with appropriate evacuation assistance plans', riskLevel: 'medium' },
        { id: 'many_with_peeps', title: 'Many vulnerable persons with evacuation plans', description: 'Significant number requiring assistance with documented plans', riskLevel: 'medium' },
        { id: 'without_plans', title: 'Vulnerable persons without adequate plans', description: 'People requiring assistance but no formal evacuation plans', riskLevel: 'high' },
      ];
      base.note = 'Personal Emergency Evacuation Plans (PEEPs) should be prepared for vulnerable persons.';
    } else if (q?.questionId === 'q8') {
      base.categoryLabel = 'Fire Hazards';
      base.subtitle = 'Identify significant fire hazards that could increase fire risk.';
      base.contextBody = 'Common hazards include ignition sources, combustible materials, and unsafe practices. Select those present in the building to inform mitigation actions.';
      base.options = [
        { id: 'electrical', title: 'Electrical equipment and wiring', description: 'Overloaded circuits, damaged cables', riskLevel: 'medium' },
        { id: 'heating', title: 'Heating equipment', description: 'Gas heaters, portable heaters', riskLevel: 'high' },
        { id: 'cooking', title: 'Cooking facilities and appliances', description: 'Kitchens, cooking oils and grease', riskLevel: 'high' },
        { id: 'flammables', title: 'Flammable storage and liquids', description: 'Paints, solvents, alcohols, chemicals', riskLevel: 'high' },
        { id: 'smoking', title: 'Smoking materials and designated areas', description: 'Discarded cigarettes, ash bins', riskLevel: 'medium' },
        { id: 'hot_work', title: 'Hot work activities (welding, cutting)', description: 'Sparks, heat sources during works', riskLevel: 'high' },
        { id: 'storage', title: 'Large storage areas with combustible materials', description: 'Warehouse racking, paper/cardboard', riskLevel: 'medium' },
        { id: 'waste', title: 'Waste/rubbish storage and disposal', description: 'Bins near buildings, accumulation of waste', riskLevel: 'medium' },
      ];
      base.note = undefined;
    } else {
      base.options = (q?.options || []).map((o: any) => ({ id: o.id, title: o.text }));
    }
    return base;
  };
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
          activeStep={currentStep}
          progress={{ current: completedStepsList.length, total: 5 }}
          estimatedTime={currentStep === 2 ? Math.max(1, totalQuestions - answeredCount) * 2 : 6}
          certificationBadge="UK Compliance Certified"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">UK Fire Safety Assessment</h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">Complete this comprehensive questionnaire to assess your building’s fire safety compliance with UK regulations and identify areas for improvement.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Questions / Center Column */}
          <section className="lg:col-span-8">
            <div className="mb-6 hidden sm:block">
              <div className="text-xs text-gray-500">Assessment • Building Type • Question {Math.min(currentIndex + 1, questions.length) || 1} of {questions.length || 8}</div>
            </div>
            {!loading && questions[currentIndex] && (
            <AssessmentQuestionCard
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length || 8}
              questionText={questions[currentIndex]?.text || 'Question'}
              {...buildUiForQuestion(questions[currentIndex])}
              nextLabel={currentIndex === (questions.length - 1) ? 'Complete Assessment' : undefined}
              onChange={(val) => handleAnswer(val)}
              onSave={() => {}}
              onPrev={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              onNext={() => {
                const last = (questions.length || 1) - 1;
                if (currentIndex >= last) {
                  handleCompleteAssessment();
                } else {
                  setCurrentIndex(Math.min(last, currentIndex + 1));
                }
              }}
            />
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 lg:block">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Assessment Progress */}
              <AssessmentProgressPanel
                percent={summary.percent || 13}
                categories={[
                  { id: 'info', title: 'Building Information', completed: 2, total: 2, status: 'completed' },
                  { id: 'systems', title: 'Fire Safety Systems', completed: 1, total: 1, status: 'completed' },
                  { id: 'escape', title: 'Means of Escape', completed: 1, total: 1, status: 'completed' },
                  { id: 'management', title: 'Fire Safety Management', completed: 1, total: 1, status: 'completed' },
                ]}
                complianceText="UK Fire Safety Regulations 2005 Compliant"
              />

              {/* Assessment Summary */}
              <AssessmentSummaryPanel
                answered={8}
                total={8}
                compliancePercent={100}
                riskLevel="medium"
                stats={[
                  { id: 'answered', label: 'Questions answered', value: 8 },
                  { id: 'compliance', label: 'Compliance status', value: 'Compliant' },
                  { id: 'flagged', label: 'Risk categories flagged', value: 0 },
                  { id: 'review', label: 'Items needing review', value: 0 },
                ]}
                links={[
                  { id: 'reg1', label: 'UK Fire Safety Regulation 2005' },
                  { id: 'reg2', label: 'Building Regulations: Approved Doc B' },
                ]}
              />
            </div>
          </aside>
        </div>

        {/* Bottom Help / Footer Info */}
        <div className="mt-10">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
            <div className="flex items-start sm:items-center gap-3">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z" clipRule="evenodd" /></svg>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-green-700">Need Help with Fire Safety Terms?</h4>
                <div className="mt-1 inline-flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2l6 3v5c0 4.418-3.582 8-8 8S0 14.418 0 10V5l6-3 2 1 2-1z" clipRule="evenodd"/></svg>
                  Secure & Confidential
                </div>
                <p className="mt-2 text-sm text-gray-700">
                  Get expert help with terminology, legal requirements, and references to UK fire safety regulations.
                </p>
                <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-4">
                  <a className="hover:text-red-600" href="#">UK Fire Safety 2005</a>
                  <a className="hover:text-red-600" href="#">Building Regulations Section B</a>
                  <a className="hover:text-red-600" href="#">Contact Support</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


