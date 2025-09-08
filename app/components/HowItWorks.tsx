export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center py-16">
          <div className="flex items-center justify-center mb-6">
            <svg className="w-4 h-4 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-red-600 font-bold text-xs uppercase tracking-wider">How it works</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Three Simple Steps to Compliance
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto">
            Our streamlined process makes fire risk assessment accessible to property owners and managers of all experience levels.
          </p>
        </div>

        {/* Three Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Step 1 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200">
            <div className="absolute -top-3 -left-3 w-7 h-7 bg-red-600 text-white rounded-full text-xs flex items-center justify-center ring-2 ring-white shadow">
              1
            </div>
            <div className="flex items-start space-x-3 mb-4">
              <svg className="w-9 h-9 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">Answer Questions</h3>
                  <span className="text-xs text-slate-400">5–8 minutes</span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm md:text-base flex-grow">
              Complete our guided questionnaire covering all aspects of fire safety in your property. Simple multiple-choice format suitable for all technical levels.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200">
            <div className="absolute -top-3 -left-3 w-7 h-7 bg-red-600 text-white rounded-full text-xs flex items-center justify-center ring-2 ring-white shadow">
              2
            </div>
            <div className="flex items-start space-x-3 mb-4">
              <svg className="w-9 h-9 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">Get Assessment</h3>
                  <span className="text-xs text-slate-400">Instant</span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm md:text-base flex-grow">
              Our system evaluates your responses against UK fire safety regulations and generates a comprehensive risk assessment score.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 relative h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200">
            <div className="absolute -top-3 -left-3 w-7 h-7 bg-red-600 text-white rounded-full text-xs flex items-center justify-center ring-2 ring-white shadow">
              3
            </div>
            <div className="flex items-start space-x-3 mb-4">
              <svg className="w-9 h-9 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">Download Report</h3>
                  <span className="text-xs text-slate-400">Immediate</span>
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-sm md:text-base flex-grow">
              Receive a professional PDF report with detailed findings, recommendations, and compliance documentation for your records.
            </p>
          </div>
        </div>

        {/* UK Fire Safety Regulations Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm py-6 px-6 max-w-3xl mx-auto mt-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-base md:text-lg font-bold text-gray-900">UK Fire Safety Regulations</h3>
            </div>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              Our assessment covers all requirements under the Regulatory Reform (Fire Safety) Order 2005 and Building Regulations Approved Document B, ensuring complete compliance for your property.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
