import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="bg-white font-sans text-gray-700">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">About PMSSS</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">Empowering students through a seamless, paperless scholarship system</p>
            <div className="mt-10">
              <Link to="/register" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 mr-4 transition-colors">Apply Now</Link>
              <a href="#contact" className="border-2 border-indigo-600 text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
            <p className="text-lg text-gray-700 mb-6">
              The Paperless Scholarship Disbursement System (PSDS) was created to simplify scholarship application and distribution, saving time and ensuring transparency for students across India. For years, we witnessed the challenges students faced with traditional paper-based systems - lost documents, lengthy processing times, and lack of transparency in the selection process.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our journey began in 2020 when our founder, Rajesh Kumar, noticed his younger sister struggling to apply for multiple scholarships. The cumbersome process of filling out similar forms repeatedly, attaching physical documents, and waiting months for responses inspired him to create a unified digital platform.
            </p>
            <p className="text-lg text-gray-700">
              Today, PSDS partners with over 50 educational trusts, government bodies, and corporate CSR programs to bring a seamless scholarship experience to students nationwide. We've helped disburse over ₹25 crores to more than 12,000 deserving students, saving an estimated 5 million sheets of paper in the process.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">Mission Statement</h3>
              <p className="text-gray-700">
                Our mission is to make scholarship distribution fast, secure, and completely paperless for every deserving student. We strive to eliminate barriers to education by streamlining the application process, reducing processing times by 70%, and ensuring funds reach students directly through secure banking channels.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">Vision Statement</h3>
              <p className="text-gray-700">
                To transform educational aid in India by adopting innovative, technology-driven solutions that create a transparent, efficient, and accessible scholarship ecosystem. We envision a future where no student misses educational opportunities due to cumbersome application processes or delayed fund disbursement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do / Key Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">What We Do</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Our platform offers a comprehensive suite of features designed to simplify the scholarship process for students and administrators alike.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Online Application Submission</h3>
              </div>
              <p className="text-gray-700">Students can apply from anywhere, anytime through our responsive web platform. Our smart form technology auto-fills repetitive information, and documents are securely stored in digital format.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Automated Eligibility Verification</h3>
              </div>
              <p className="text-gray-700">Our AI-powered system cross-verifies applicant information with supporting documents, reducing human error and ensuring fair assessment based on predefined criteria.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Secure Fund Transfer</h3>
              </div>
              <p className="text-gray-700">Scholarship money is transferred directly to students' bank accounts through secure payment gateways with complete transaction tracking and instant notifications.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-indigo-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Real-Time Status Updates</h3>
              </div>
              <p className="text-gray-700">Applicants and administrators can track application progress through every stage with automated notifications and a comprehensive dashboard with real-time updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section id="apply" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">How to Apply for Scholarship</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Follow these simple steps to apply for scholarships through our platform</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8 flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-6">
                    <span className="text-indigo-600 font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                  <p className="text-gray-700">Sign up with your email and basic information. Verify your account through the link sent to your email.</p>
                </div>
              </div>
              
              <div className="mb-8 flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-6">
                    <span className="text-indigo-600 font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
                  <p className="text-gray-700">Fill in your academic details, family information, and upload necessary documents (ID proof, income certificate, marksheets).</p>
                </div>
              </div>
              
              <div className="mb-8 flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-6">
                    <span className="text-indigo-600 font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Browse Scholarships</h3>
                  <p className="text-gray-700">Explore available scholarships filtered based on your eligibility. Check deadlines, amount, and requirements.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-6">
                    <span className="text-indigo-600 font-bold">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Submit & Track</h3>
                  <p className="text-gray-700">Apply with one click using your pre-filled data. Track your application status in real-time through your dashboard.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-xl">
              <div className="relative pb-56 h-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <p>Application Tutorial Video</p>
                    <p className="text-sm mt-2 text-indigo-200">(Video will be embedded here)</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4">Watch our step-by-step tutorial on how to apply for scholarships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Meet the dedicated professionals behind our platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Suraj Savale", role: "Backend Developer", initials: "SS" },
              { name: "Tushar Kalugade", role: "Backend Developer", initials: "TK" },
              { name: "Sanika Aher", role: "Backend Developer", initials: "SA" },
              { name: "Komal Pawar", role: "Frontend Developer", initials: "KP" },
              { name: "Aditi Mundhe", role: "Frontend Developer", initials: "AM" },
              { name: "Swampni Kalambe", role: "Frontend Developer", initials: "SK" }
            ].map((member, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-indigo-100 mx-auto mb-3 flex items-center justify-center text-indigo-600 text-lg font-bold">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of students who have benefited from our paperless scholarship system.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">Apply for your scholarship today!</Link>
            <a href="#contact" className="bg-white text-indigo-600 border-2 border-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-indigo-50 transition duration-300">Contact us for more information</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2025 Prime Minister's Special Scholarship Scheme (PMSSS). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;