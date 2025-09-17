import { useState, useEffect } from "react";
import HeroBg from "../assets/Hero.jpg";

const Landing = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, [isLoading]);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-indigo-600 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">PMSSS</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`w-full animate-fade-in ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <div className="relative h-screen">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-transparent z-20 px-4 py-4 animate-slide-down">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            PMSSS
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#about" className={`${isDarkMode ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'} transition-colors`}>
              About
            </a>
            <a href="#features" className={`${isDarkMode ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'} transition-colors`}>
              Features
            </a>
            <a href="#contact" className={`${isDarkMode ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'} transition-colors`}>
              Contact
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-4 p-2 rounded-md bg-transparent hover:bg-gray-600 hover:bg-opacity-20 transition-colors"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <a
              href="/login"
              className={`px-4 py-2 border rounded-md transition-colors ${
                isDarkMode 
                  ? 'border-white text-white hover:bg-white hover:text-gray-900' 
                  : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
              }`}
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 rounded-md transition-colors"
            >
              Register
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black bg-opacity-80 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="text-white hover:text-blue-300 transition-colors">
                About
              </a>
              <a href="#features" className="text-white hover:text-blue-300 transition-colors">
                Features
              </a>
              <a href="#contact" className="text-white hover:text-blue-300 transition-colors">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-600">
                <a
                  href="/login"
                  className="px-4 py-2 border border-white text-white hover:bg-white hover:text-gray-900 rounded-md transition-colors text-center"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 bg-indigo-500 text-white hover:bg-white hover:text-indigo-500 rounded-md transition-colors text-center"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Background */}
      {isDarkMode && (
        <img
          src={HeroBg}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}
      
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center animate-fade-in-up">
        <div className="text-lg md:text-xl text-indigo-300 mb-4 animate-float">
          Paperless. Transparent. Accessible.
        </div>
        <h1
          className={`text-4xl md:text-6xl font-bold mb-4 ${
            isMobile ? "text-2xl" : ""
          }`}
        >
         Prime Minister’s Special Scholarship Scheme (PMSSS)
        </h1>
        <p
          className={`text-lg md:text-2xl mb-8 max-w-2xl ${
            isMobile ? "text-base" : ""
          }`}
        >
          A digital platform ensuring transparency, efficiency, and accessibility in scholarship distribution.
        </p>
        <a
          href="/register"
          className="bg-indigo-500 hover:bg-white hover:text-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Apply for Scholarship
        </a>
      </div>
      
      </div>
      
      {/* Features Section */}
      <section id="features" className={`py-16 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl md:text-3xl font-bold text-center mb-12 animate-on-scroll ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Paperless Application", desc: "Simple. Digital. Eco-friendly." },
              { title: "Transparent Process", desc: "Clear. Open. Fair." },
              { title: "Automated Verification", desc: "Smart. Accurate. Reliable." },
              { title: "Direct Benefit Transfer (DBT)", desc: "Secure. Direct. Hassle-free." },
              { title: "Accessibility for All", desc: "Anytime. Anywhere. Inclusive." },
              { title: "Dedicated Support", desc: "Guided. Helpful. Supportive." }
            ].map((feature, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 animate-on-scroll ${isDarkMode ? 'bg-black border border-gray-600' : 'bg-white border border-gray-200'}`} style={{animationDelay: `${index * 0.1}s`}}>
                <h3 className="text-lg font-semibold text-indigo-400 mb-2">{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className={`py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 animate-on-scroll ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About PMSSS</h2>
            <div className={`w-24 h-1 mx-auto mb-8 animate-on-scroll ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`}></div>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed mb-12 animate-on-scroll ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              The Prime Minister's Special Scholarship Scheme (PMSSS) is a flagship initiative designed to support higher education for deserving students from Jammu & Kashmir and Ladakh.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Mission</h3>
              <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To provide transparent, efficient, and accessible scholarship opportunities that empower students to pursue their academic dreams without financial barriers. We believe in creating equal opportunities for all deserving students.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Supporting over 10,000+ students annually</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>100% digital and paperless process</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Direct benefit transfer to student accounts</p>
                </div>
              </div>
            </div>
            
            <div className={`p-8 rounded-2xl animate-on-scroll ${isDarkMode ? 'bg-black border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
              <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Key Benefits</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Educational Excellence</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Supporting academic pursuits in premier institutions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community Impact</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Building stronger communities through education</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Future Ready</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Preparing students for tomorrow's challenges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className={`py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 animate-on-scroll ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions about PMSSS Scholarships</h2>
            <div className={`w-24 h-1 mx-auto mb-8 animate-on-scroll ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`}></div>
          </div>
          
          <div className="space-y-4">
            <div className={`rounded-2xl overflow-hidden animate-on-scroll ${isDarkMode ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <button
                className={`flex justify-between items-center w-full p-6 text-left font-medium transition-colors ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
                onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
              >
                <span className="text-lg">Who is eligible for PMSSS scholarships?</span>
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${openFaq === 0 ? 'rotate-180' : ''} ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`p-6 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-base leading-relaxed">Students from specific regions who have passed their 12th standard with the minimum required marks and have secured admission to recognized institutions.</p>
                </div>
              </div>
            </div>
            
            <div className={`rounded-2xl overflow-hidden animate-on-scroll ${isDarkMode ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <button
                className={`flex justify-between items-center w-full p-6 text-left font-medium transition-colors ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
              >
                <span className="text-lg">What documents are required for the application?</span>
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${openFaq === 1 ? 'rotate-180' : ''} ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`p-6 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-base leading-relaxed">Typically, you need educational certificates, proof of income, proof of identity, bank details, and proof of admission.</p>
                </div>
              </div>
            </div>
            
            <div className={`rounded-2xl overflow-hidden animate-on-scroll ${isDarkMode ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <button
                className={`flex justify-between items-center w-full p-6 text-left font-medium transition-colors ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
              >
                <span className="text-lg">How long does the application process take?</span>
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${openFaq === 2 ? 'rotate-180' : ''} ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`p-6 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-base leading-relaxed">The application review typically takes 2-3 weeks after all documents are submitted correctly.</p>
                </div>
              </div>
            </div>
            
            <div className={`rounded-2xl overflow-hidden animate-on-scroll ${isDarkMode ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <button
                className={`flex justify-between items-center w-full p-6 text-left font-medium transition-colors ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-50'}`}
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
              >
                <span className="text-lg">Can I edit my application after submission?</span>
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${openFaq === 3 ? 'rotate-180' : ''} ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`p-6 pt-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="text-base leading-relaxed">Yes, you can edit your application within 7 days of submission or until it's under review, whichever comes first.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className={`py-24 ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 animate-on-scroll ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h2>
            <div className={`w-24 h-1 mx-auto mb-8 animate-on-scroll ${isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`}></div>
            <p className={`text-xl mb-12 max-w-3xl mx-auto animate-on-scroll ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Have questions about the PMSSS application process? Our dedicated support team is here to guide you through every step of your scholarship journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 animate-on-scroll ${isDarkMode ? 'bg-gray-900 border border-gray-700 hover:border-indigo-500' : 'bg-white border border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl'}`} style={{animationDelay: '0.1s'}}>
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email Support</h3>
                    <p className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get detailed assistance via email</p>
                    <a href="mailto:support@pmsss.gov.in" className={`font-medium hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>support@pmsss.gov.in</a>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 animate-on-scroll ${isDarkMode ? 'bg-gray-900 border border-gray-700 hover:border-indigo-500' : 'bg-white border border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl'}`} style={{animationDelay: '0.2s'}}>
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Phone Support</h3>
                    <p className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Speak directly with our support team</p>
                    <a href="tel:1800-XXX-XXXX" className={`font-medium hover:underline ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>1800-XXX-XXXX</a>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 animate-on-scroll ${isDarkMode ? 'bg-gray-900 border border-gray-700 hover:border-indigo-500' : 'bg-white border border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-xl'}`} style={{animationDelay: '0.3s'}}>
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Support Hours</h3>
                    <p className={`mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>We're here when you need us</p>
                    <p className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Help Section */}
            <div className={`p-8 rounded-2xl animate-on-scroll ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'}`} style={{animationDelay: '0.4s'}}>
              <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Help</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black border border-gray-600' : 'bg-gray-50 border border-gray-100'}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Application Status</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track your scholarship application progress in real-time</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black border border-gray-600' : 'bg-gray-50 border border-gray-100'}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Document Upload</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get help with uploading and verifying your documents</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black border border-gray-600' : 'bg-gray-50 border border-gray-100'}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Eligibility Criteria</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Understand the requirements and eligibility for PMSSS</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-black border border-gray-600' : 'bg-gray-50 border border-gray-100'}`}>
                  <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Payment Issues</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Resolve any payment or disbursement related queries</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-600">
                <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Need immediate assistance?</p>
                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className={`py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Prime Minister's Special Scholarship Scheme (PMSSS). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

// Add CSS animations
const styles = `
  html {
    scroll-behavior: smooth;
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slide-down {
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fade-in-up {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes slide-up {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
  .animate-slide-down {
    animation: slide-down 0.6s ease-out 0.2s both;
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out 0.4s both;
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  .animate-in-view {
    opacity: 1;
    transform: translateY(0);
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
