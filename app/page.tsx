'use client';

import Image from 'next/image';
import HowItWorks from './components/HowItWorks';
import Header from './components/Header';
import { useEffect, useState } from 'react';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Array<{ name: string; role: string; company: string; rating: number; text: string; category: string; initials?: string }>>([]);
  const [stats, setStats] = useState<{ rating: number; approval: number; compliance: number } | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tRes, sRes] = await Promise.all([
          fetch('/api/testimonials'),
          fetch('/api/stats'),
        ]);
        if (tRes.ok) {
          const tJson = await tRes.json();
          setTestimonials(Array.isArray(tJson) ? tJson : []);
        }
        if (sRes.ok) {
          const sJson = await sRes.json();
          setStats(sJson);
        }
      } catch (e) {
        // ignore network errors for now
      }
    };
    fetchData();
  }, []);

  const faqs = [
    {
      question: "How long does the fire safety assessment take to complete?",
      answer: "The assessment typically takes 10-15 minutes to complete. Our questionnaire is designed to be comprehensive yet efficient, covering all essential fire safety aspects without overwhelming detail. You can save your progress and return later if needed."
    },
    {
      question: "Is this assessment legally compliant with UK fire safety regulations?",
      answer: "Yes, our assessment is fully compliant with the Regulatory Reform (Fire Safety) Order 2005 and Building Regulations Approved Document B. The reports generated meet all requirements for insurance, local authority inspections, and regulatory compliance documentation."
    },
    {
      question: "What types of properties can use this assessment tool?",
      answer: "Our assessment covers residential properties (flats, houses, HMOs), commercial buildings (offices, shops, warehouses), educational facilities (schools, colleges), hospitality venues (hotels, restaurants), and healthcare facilities. The questionnaire adapts based on your property type."
    },
    {
      question: "Do I need any technical fire safety knowledge to complete this?",
      answer: "No technical expertise is required. Our questionnaire uses simple, clear language and multiple-choice questions. Each question includes helpful explanations and guidance to ensure you can answer confidently, regardless of your fire safety background."
    },
    {
      question: "What happens if my assessment identifies fire safety issues?",
      answer: "If issues are identified, your report will include detailed recommendations for addressing them, prioritized by risk level. We provide practical guidance on next steps, including when to consult fire safety professionals and how to implement improvements cost-effectively."
    },
    {
      question: "Can I use this assessment for insurance or regulatory purposes?",
      answer: "Absolutely. Our PDF reports are professionally formatted and include all necessary documentation for insurance claims, local authority inspections, and regulatory compliance verification. Many insurance companies accept our assessments as valid fire risk documentation."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and CTA */}
          <div className="space-y-8">
            {/* Green Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-green-200 bg-green-50">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-800">National Fire Safety Certified</span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                Simplify Your
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-red-600">
                Fire Risk Assessment
              </h1>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-green-600">
              For £35.00
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg">
              Generate compliant national fire safety assessments in minutes. Professional reports, downloadable PDFs, and complete regulatory compliance made simple.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">National Regulation Compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Complete in 10-15 Minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Professional PDF Reports</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Instant Download</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center">
                Start Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Fully Compliant Risk Assessment for only £35
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-sm text-gray-500">
              No registration required • Free assessment • Instant results
            </p>
          </div>

          {/* Right Column - Hero Image with Badges */}
          <div className="relative">
            {/* Hero Image */}
            <div className="relative w-full h-96 rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/hero-image.png"
                alt="Fire Risk Assessment Report"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Top Right Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg px-4 py-3 shadow-lg z-10">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <div>
                  <div className="text-lg font-bold text-gray-900">15,000+</div>
                  <div className="text-xs text-gray-600">Assessments Completed</div>
                </div>
              </div>
            </div>

            {/* Bottom Left Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg px-4 py-3 shadow-lg z-10">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="text-lg font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Nationally Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <div className="mt-0">
        <HowItWorks />
      </div>

      {/* Results Expectations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center bg-gray-50 rounded-2xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
          What to Expect in Your Results
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Your comprehensive fire risk assessment will include
        </p>
        {/* Four Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 h-full flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-600 mb-4">
              {/* Bar chart icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 3a1 1 0 011-1h1a1 1 0 011 1v14H3V3zm6 5a1 1 0 011-1h1a1 1 0 011 1v9H9V8zm6-4a1 1 0 011-1h1a1 1 0 011 1v13h-3V4z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Risk Assessment Scores</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Detailed scoring across all fire safety categories with clear risk levels.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 h-full flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-600 mb-4">
              {/* Warning triangle icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.595c.75 1.334-.215 2.996-1.742 2.996H3.48c-1.527 0-2.492-1.662-1.742-2.996L8.257 3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Priority Recommendations</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Actionable steps ranked by importance to improve fire safety compliance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 h-full flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-600 mb-4">
              {/* Document icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V3z" />
                <path d="M13 1v4a1 1 0 001 1h4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Compliance Report</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Professional PDF report suitable for insurance and regulatory purposes.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 h-full flex flex-col">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-600 mb-4">
              {/* Checklist icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16 2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h10zm-8.293 7.293a1 1 0 011.414 0L10 10.172l2.879-2.879a1 1 0 111.414 1.414L10 13.001l-2.293-2.294a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Action Checklist</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Step-by-step guidance to address identified risks.
            </p>
          </div>
        </div>
        {/* Bottom Highlight Box */}
        <div className="mt-12 lg:mt-16 max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
            <div className="flex items-start sm:items-center sm:justify-center">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="sm:ml-3 text-left sm:text-center w-full">
                <h4 className="font-semibold text-green-700">Instant Results</h4>
                <p className="mt-2 text-sm text-gray-700">
                  Upon completion of your assessment, all results are generated instantly and available for immediate download. Your data remains secure and confidential throughout the process.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Call to Action Section - Full Width Red */}
      <section className="relative w-full text-white bg-[#E22626] py-20 sm:py-24 overflow-hidden">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 text-gray-700 text-xs font-medium tracking-wide mb-6">
            Ready to Get Started?
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Start Your Fire Safety Assessment Today
          </h3>
          <p className="mt-4 text-white max-w-3xl mx-auto">
            Join over 15,000 UK property owners who have achieved fire safety compliance with our professional assessment platform.
          </p>
          {/* Benefits - two rows, two columns */}
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {/* Complete UK regulatory compliance */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-white/95 text-sm">Complete UK regulatory compliance</span>
            </div>

            {/* Professional PDF documentation */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V3z" />
                  <path d="M13 1v4a1 1 0 001 1h4" />
                </svg>
              </span>
              <span className="text-white/95 text-sm">Professional PDF documentation</span>
            </div>

            {/* Results in under 15 minutes */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.5-12a.5.5 0 00-1 0v4.25c0 .199.079.39.22.53l2.5 2.5a.75.75 0 101.06-1.06l-2.78-2.78V6z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-white/95 text-sm">Results in under 15 minutes</span>
            </div>

            {/* Insurance-ready assessment */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2l6 3v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V5l6-3 2 1 2-1z" />
                </svg>
              </span>
              <span className="text-white/95 text-sm">Insurance-ready assessment</span>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
              Start Now →
            </button>
            <button className="bg-white text-[#E22626] border-2 border-[#E22626] px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200">
              Fully Compliant Risk Assessment for only £35
            </button>
          </div>
          {/* Bottom info line */}
          <div className="mt-10 border-t border-white/20 pt-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-white/90 text-xs">
              {/* UK Certified */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
                <span>UK Certified</span>
              </div>

              {/* Secure & Private */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z" clipRule="evenodd" />
                </svg>
                <span>Secure & Private</span>
              </div>

              {/* Professional Grade */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 011-1h0a1 1 0 011 1v2h4a1 1 0 011 1v2a5 5 0 01-5 5h-2a5 5 0 01-5-5V5a1 1 0 011-1h4V2zM7 15a1 1 0 011-1h4a1 1 0 011 1v2H7v-2z" />
                </svg>
                <span>Professional Grade</span>
              </div>

              {/* Instant Download */}
              <div className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 14a1 1 0 011-1h3V4a1 1 0 112 0v9h3a1 1 0 110 2H4a1 1 0 01-1-1zm6.293-1.293a1 1 0 001.414 0l2-2a1 1 0 10-1.414-1.414L11 9.586V4a1 1 0 10-2 0v5.586L8.707 9.293a1 1 0 10-1.414 1.414l2 2z" clipRule="evenodd" />
                </svg>
                <span>Instant Download</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold tracking-widest text-red-600">
            TESTIMONIALS
          </span>
          <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            What Property Professionals Say
          </h3>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Join thousands of UK property owners and managers who trust our fire safety assessment
            platform.
          </p>
          {/* Testimonial Cards (dynamic if available) */}
          {testimonials.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch text-left">
              {testimonials.map((t, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
                  <div className="text-6xl text-red-600 font-serif leading-none mb-4">"</div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 0 0 -.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.034a1 1 0 0 0 -1.175 0l-2.801 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0 -.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">{t.text}</p>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">{t.initials || t.name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-600">{t.role}</div>
                      <div className="text-sm text-gray-600">{t.company}</div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 0 0 -1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414l-7-7z" />
                    </svg>
                    <span className="text-sm font-medium">{t.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Static fallback when no testimonials fetched */}
          {testimonials.length === 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-stretch text-left">
            {/* Card 1 - Sarah Mitchell */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
              {/* Large quote icon */}
              <div className="text-6xl text-red-600 font-serif leading-none mb-4">"</div>
              
              {/* Stars */}
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.034a1 1 0 00-1.175 0l-2.801 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                The assessment was incredibly straightforward and saved us hours of paperwork. The PDF report was exactly what our insurance company needed for compliance verification.
              </p>
              
              {/* Person info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full ml-1"></div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                  <div className="text-sm text-gray-600">Property Manager</div>
                  <div className="text-sm text-gray-600">London Residential Ltd</div>
                </div>
              </div>
              
              {/* Category */}
              <div className="mt-auto flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="text-sm font-medium">Residential Complex</span>
              </div>
            </div>

            {/* Card 2 - James Thompson */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
              {/* Large quote icon */}
              <div className="text-6xl text-red-600 font-serif leading-none mb-4">"</div>
              
              {/* Stars */}
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.034a1 1 0 00-1.175 0l-2.801 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                As someone without a fire safety background, I was worried about getting this wrong. The questionnaire was clear, and the results gave me complete confidence in our compliance status.
              </p>
              
              {/* Person info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">JT</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">James Thompson</div>
                  <div className="text-sm text-gray-600">Facilities Director</div>
                  <div className="text-sm text-gray-600">Manchester Business Centre</div>
                </div>
              </div>
              
              {/* Category */}
              <div className="mt-auto flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                <span className="text-sm font-medium">Commercial Office</span>
              </div>
            </div>

            {/* Card 3 - Emma Roberts */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full flex flex-col">
              {/* Large quote icon */}
              <div className="text-6xl text-red-600 font-serif leading-none mb-4">"</div>
              
              {/* Stars */}
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.034a1 1 0 00-1.175 0l-2.801 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                The detailed recommendations helped us identify areas for improvement we hadn't considered. The report format was perfect for our local authority inspection.
              </p>
              
              {/* Person info */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">ER</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Emma Roberts</div>
                  <div className="text-sm text-gray-600">School Administrator</div>
                  <div className="text-sm text-gray-600">Westfield Primary School</div>
                </div>
              </div>
              
              {/* Category */}
              <div className="mt-auto flex items-center text-green-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="text-sm font-medium">Educational Facility</span>
              </div>
            </div>
          </div>
          )}
          {/* Growing Trust */}
          <div className="mt-12 max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-md text-center">
            <h4 className="text-2xl font-bold text-gray-900">Growing Trust</h4>
            <p className="mt-3 text-gray-600">
              Over 15,000 UK properties have completed their fire safety assessments using our
              platform. Join property professionals who trust us for accurate, compliant, and
              professional fire risk assessments.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.034a1 1 0 00-1.175 0l-2.801 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div className="mt-2 text-2xl font-extrabold text-green-600">{stats ? `${stats.rating}/5` : '4.9/5'}</div>
                <div className="text-xs text-gray-500">Average Rating</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 10a2 2 0 012-2h3.28l.94-3.13A2 2 0 0110.16 3h.68c.86 0 1.56.68 1.56 1.53v3.64h3.08a1.5 1.5 0 011.42 2.03l-2.13 6A2 2 0 0113.9 18H7a2 2 0 01-2-2v-4H4a2 2 0 01-2-2z" clipRule="evenodd"/></svg>
                </div>
                <div className="mt-2 text-2xl font-extrabold text-green-600">{stats ? `${stats.approval}%` : '98%'}</div>
                <div className="text-xs text-gray-500">Would Recommend</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l6 3v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V5l6-3 2 1 2-1z"/></svg>
                </div>
                <div className="mt-2 text-2xl font-extrabold text-green-600">{stats ? `${stats.compliance}%` : '100%'}</div>
                <div className="text-xs text-gray-500">Compliance Rate</div>
              </div>
            </div>
          </div>

          {/* Trusted & Certified */}
          <section className="mt-16">
            <h4 className="text-2xl font-bold text-gray-900 text-center">Trusted & Certified</h4>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* UK Fire Safety Certified */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600">
                  {/* Shield icon */}
                  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l6 3v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V5l6-3 2 1 2-1z"/></svg>
                </div>
                <div className="mt-3 font-semibold text-gray-900">UK Fire Safety Certified</div>
                <div className="text-xs text-gray-500">Approved by UK Fire Safety Authorities</div>
              </div>

              {/* GDPR Compliant */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600">
                  {/* Lock icon */}
                  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z" clipRule="evenodd"/></svg>
                </div>
                <div className="mt-3 font-semibold text-gray-900">GDPR Compliant</div>
                <div className="text-xs text-gray-500">Your data is secure and protected</div>
              </div>

              {/* Professional Standards */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600">
                  {/* Badge icon */}
                  <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927a1 1 0 011.902 0l.625 1.923a1 1 0 00.95.69h2.021a1 1 0 01.592 1.806l-1.636 1.19a1 1 0 00-.364 1.118l.625 1.923a1 1 0 01-1.54 1.118l-1.636-1.19a1 1 0 00-1.175 0l-1.636 1.19a1 1 0 01-1.54-1.118l.625-1.923a1 1 0 00-.364-1.118L4.861 7.346A1 1 0 015.453 5.54h2.02a1 1 0 00.951-.69l.625-1.923z"/></svg>
                </div>
                <div className="mt-3 font-semibold text-gray-900">Professional Standards</div>
                <div className="text-xs text-gray-500">Meets industry best practices</div>
              </div>
            </div>
          </section>

          {/* Proven Results */}
          <section className="mt-16 text-center">
            <h4 className="text-2xl font-bold text-gray-900">Proven Results</h4>
            <p className="mt-2 text-gray-600">Trusted by thousands of UK property owners and managers</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Properties Assessed */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z"/></svg>
                </div>
                <div className="mt-3 text-2xl font-extrabold text-gray-900">15,000+</div>
                <div className="text-xs text-gray-500">Properties Assessed</div>
              </div>
              {/* Compliance Rate */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                </div>
                <div className="mt-3 text-2xl font-extrabold text-gray-900">99.8%</div>
                <div className="text-xs text-gray-500">Compliance Rate</div>
              </div>
              {/* Report Access */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.5-12a.5.5 0 00-1 0v4.25c0 .199.079.39.22.53l2.5 2.5a.75.75 0 101.06-1.06l-2.78-2.78V6z" clipRule="evenodd"/></svg>
                </div>
                <div className="mt-3 text-2xl font-extrabold text-gray-900">24/7</div>
                <div className="text-xs text-gray-500">Report Access</div>
              </div>
              {/* Average Rating */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.801 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.801-2.034a1 1 0 00-1.175 0l-2.801 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div className="mt-3 text-2xl font-extrabold text-gray-900">5★</div>
                <div className="text-xs text-gray-500">Average Rating</div>
              </div>
            </div>
            {/* Secure & Confidential Notice */}
            <div className="mt-10 max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
              <div className="flex items-start sm:items-center justify-center gap-3">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left sm:text-center">
                  <h5 className="font-semibold text-green-700">Secure & Confidential</h5>
                  <p className="mt-2 text-sm text-gray-700">
                    All assessment data is encrypted and stored securely. We never share your information with third parties. Your privacy and data security are our top priorities.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h3>
          <p className="mt-3 text-gray-600">
            Common questions about our fire safety assessment process
          </p>
          {/* FAQ Accordion */}
          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions? */}
          <div className="mt-12 max-w-4xl mx-auto bg-gray-50 rounded-lg border border-gray-200 p-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 mr-3">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900">Still Have Questions?</h4>
              </div>
              <p className="text-gray-500 mb-8">
                Our fire safety experts are here to help. Get personalized assistance with your assessment or compliance requirements.
              </p>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Email */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 mr-3">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700">support@ukfireassessor.co.uk</div>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 mr-3">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700">0800 123 4567</div>
                </div>

                {/* Hours */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 mr-3">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-gray-700">Mon-Fri 9AM-6PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* National Fire Risk Prevention Report */}
            <div className="lg:col-span-1">
              <div className="flex items-start mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm">NFPR</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                    National Fire Risk Prevention<br />
                    Report
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional fire safety assessment platform for<br />
                national property compliance.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Start Assessment</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">View Results</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Download Report</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Support</h5>
              <ul className="space-y-2">
                <li><a href="mailto:support@nfprreport.co.uk" className="text-sm text-gray-600 hover:text-red-600 transition-colors">support@nfprreport.co.uk</a></li>
                <li><a href="tel:08001234567" className="text-sm text-gray-600 hover:text-red-600 transition-colors">0800 123 4567</a></li>
                <li><span className="text-sm text-gray-600">Mon-Fri 9AM-6PM</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 transition-colors">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm text-gray-600">
                © 2025 NFPR National Fire Risk Prevention Report. All rights reserved.
              </div>
              <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                Compliant with National Fire Safety Regulations
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
