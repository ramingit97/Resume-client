import React, { useState } from 'react';
import { Menu, X, ChevronDown, Check, Star, MessageSquare, FileText, BarChart3, Target } from 'lucide-react';

const MyResumeLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [pricingPeriod, setPricingPeriod] = useState('weekly');

  const faqs = [
    {
      question: "What is MyResume.ai, and how can it help my career?",
      answer: "MyResume.ai is an AI-powered career copilot that helps you create ATS-friendly resumes through interactive chat, provides instant resume scoring, and optimizes your resume for specific job positions."
    },
    {
      question: "How does the AI Chat Resume Builder work?",
      answer: "Simply chat with our AI about your experience and skills. The AI will guide you through creating your resume, show you live previews, and help refine it until it's perfect."
    },
    {
      question: "Can MyResume.ai score my existing resume?",
      answer: "Yes! Upload your resume and get an instant detailed score with actionable feedback on formatting, keywords, impact statements, and ATS compatibility."
    },
    {
      question: "How does job position matching work?",
      answer: "Enter a job title, and our AI will compare your resume against top job postings for that position, identifying gaps and suggesting improvements to match industry standards."
    },
    {
      question: "Is MyResume.ai free, or do I need to pay for premium features?",
      answer: "We offer a free Basic plan with essential features, and a Premium plan with unlimited access to all tools including unlimited resume analysis and job matching."
    },
    {
      question: "How can I get started with MyResume.ai?",
      answer: "Simply sign up for free, and start chatting with our AI to build your resume or upload an existing one for analysis."
    }
  ];

  const pricingPlans = {
    weekly: { basic: 'Free', premium: 8, total: 8.99 },
    monthly: { basic: 'Free', premium: 25, total: 25.99 },
    quarterly: { basic: 'Free', premium: 65, total: 65.99 },
    yearly: { basic: 'Free', premium: 200, total: 200.99, discount: '20% saved' }
  };

  const testimonials = [
    {
      text: "The chat-based resume builder is incredible! I just talked about my experience and it created a perfect resume with live preview. Got 3 interviews in the first week!",
      name: "Max Li",
      role: "Senior Software Engineer",
      rating: 5
    },
    {
      text: "The resume scoring feature showed me exactly what was wrong with my resume. After fixing those issues based on the feedback, my interview rate tripled!",
      name: "Andrii Z",
      role: "Full Stack Engineer",
      rating: 5
    },
    {
      text: "Job position matching is a game-changer! I optimized my resume for 'Financial Analyst' positions and it showed me exactly what top companies look for.",
      name: "David Gartner",
      role: "Financial Analyst",
      rating: 5
    }
  ];

  const coreFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      color: "blue",
      title: "AI Chat Resume Builder",
      subtitle: "Build Through Conversation",
      description: "Chat with our AI to create your resume naturally. Just tell us about your experience, and watch your resume come to life with real-time preview as you chat.",
      features: [
        "Natural conversation-based resume creation",
        "Live preview as you build",
        "AI suggests improvements in real-time",
        "Export in multiple formats"
      ],
      cta: "START CHATTING"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      color: "green",
      title: "Resume Scoring & Analysis",
      subtitle: "Get Instant Feedback",
      description: "Upload your resume and receive a comprehensive score with detailed analysis. See exactly what's working and what needs improvement.",
      features: [
        "Overall ATS compatibility score",
        "Keyword density analysis",
        "Format and structure review",
        "Actionable improvement suggestions"
      ],
      cta: "SCORE MY RESUME"
    },
    {
      icon: <Target className="w-8 h-8" />,
      color: "purple",
      title: "Job Position Matching",
      subtitle: "Optimize for Your Target Role",
      description: "Compare your resume against top job postings for your target position. Get insights on what leading companies look for and adapt your resume accordingly.",
      features: [
        "Match against real job postings",
        "Industry-specific recommendations",
        "Keyword gap analysis",
        "Competitive positioning insights"
      ],
      cta: "MATCH MY RESUME"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MyResume.ai</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">AI Resume Builder</a>
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Resources</a>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <a 
                href="/auth/login"
                className="text-indigo-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-all duration-200 border border-transparent hover:border-indigo-200"
              >
                LOG IN
              </a>
              <a 
                href="/auth/login"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                SIGN UP FREE
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">AI Resume Builder</a>
                <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Resources</a>
                <a 
                  href="/auth/login"
                  className="text-indigo-600 font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-all duration-200 border border-indigo-200 text-center"
                >
                  LOG IN
                </a>
                <a 
                  href="/auth/login"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md text-center"
                >
                  SIGN UP FREE
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🚀 Chat, Score, Match - Your AI Resume Copilot
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Build Your Perfect Resume<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
              Through Simple Conversation
            </span>
          </h1>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Chat with AI to build your resume, get instant scoring and feedback, then optimize it for your dream job position. All in one powerful platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/auth/login"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 shadow-lg inline-flex items-center justify-center"
            >
              <MessageSquare className="mr-2" size={20} />
              START BUILDING FOR FREE
            </a>
            <a 
              href="#features"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 inline-flex items-center justify-center"
            >
              SEE HOW IT WORKS
            </a>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-indigo-600 font-semibold mb-2">CORE FEATURES</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Three Powerful Tools,<br />
              <span className="text-indigo-600">One Complete Solution</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to create, optimize, and perfect your resume
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 ${
                feature.color === 'blue' ? 'border-blue-500' : 
                feature.color === 'green' ? 'border-green-500' : 
                'border-purple-500'
              }`}>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                  feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : 
                  feature.color === 'green' ? 'bg-green-100 text-green-600' : 
                  'bg-purple-100 text-purple-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className={`text-sm font-semibold mb-4 ${
                  feature.color === 'blue' ? 'text-blue-600' : 
                  feature.color === 'green' ? 'text-green-600' : 
                  'text-purple-600'
                }`}>
                  {feature.subtitle}
                </p>
                <p className="text-gray-700 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="/auth/login"
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    feature.color === 'blue' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : feature.color === 'green' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {feature.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How It Works: <span className="text-indigo-600">Simple & Powerful</span>
            </h2>
            <p className="text-gray-600 text-lg">
              From chat to perfect resume in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageSquare className="text-white" size={32} />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-4">01</div>
              <h3 className="text-2xl font-bold mb-3">Chat & Build</h3>
              <p className="text-gray-600">
                Have a natural conversation with our AI. Tell us about your experience, and watch your resume build in real-time with live preview.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BarChart3 className="text-white" size={32} />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-4">02</div>
              <h3 className="text-2xl font-bold mb-3">Score & Improve</h3>
              <p className="text-gray-600">
                Get instant detailed scoring on your resume. See exactly what's strong and what needs work with actionable feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="text-white" size={32} />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-4">03</div>
              <h3 className="text-2xl font-bold mb-3">Match & Optimize</h3>
              <p className="text-gray-600">
                Compare your resume with top job postings for your position. Adapt and optimize to match what employers are looking for.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="/auth/login"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 inline-block"
            >
              GET STARTED NOW - IT'S FREE
            </a>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-indigo-600 font-semibold mb-2">💬 CHAT-BASED BUILDER</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Build Your Resume<br />
                <span className="text-indigo-600">Just By Chatting</span>
              </h2>
              <p className="text-gray-700 mb-6">
                No more struggling with templates or formatting. Just have a conversation with our AI about your experience, skills, and goals. Our AI will:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-indigo-600" size={18} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg mb-1">Guide You Through Questions</h4>
                    <p className="text-gray-600">Natural conversation to extract your best achievements</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-indigo-600" size={18} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg mb-1">Show Live Preview</h4>
                    <p className="text-gray-600">Watch your resume update in real-time as you chat</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-indigo-600" size={18} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg mb-1">Suggest Improvements</h4>
                    <p className="text-gray-600">Get real-time tips to make your resume stronger</p>
                  </div>
                </li>
              </ul>
              <a 
                href="/auth/login"
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 shadow-lg inline-block"
              >
                START CHATTING NOW
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-white" size={16} />
                  </div>
                  <div className="ml-3 bg-indigo-100 rounded-lg px-4 py-2 flex-1">
                    <p className="text-sm text-gray-800">Hi! Let's build your resume. What's your current or target job title?</p>
                  </div>
                </div>
                <div className="flex items-start mb-3 justify-end">
                  <div className="bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs">
                    <p className="text-sm">Senior Software Engineer</p>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="text-white" size={16} />
                  </div>
                  <div className="ml-3 bg-indigo-100 rounded-lg px-4 py-2 flex-1">
                    <p className="text-sm text-gray-800">Great! Tell me about your most recent role and key achievements...</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-2">LIVE PREVIEW</p>
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <h4 className="font-bold text-sm mb-1">John Smith</h4>
                  <p className="text-xs text-gray-600 mb-3">Senior Software Engineer</p>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Real Results for <span className="text-indigo-600">Job Seekers Like You</span>
          </h2>
          <p className="text-center text-gray-600 mb-16">
            More interviews, offers, and a faster path to your next role
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-center shadow-xl text-white">
              <div className="text-5xl font-bold mb-4">500k+</div>
              <div className="text-xl font-semibold">Job Seekers Served</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-center shadow-xl text-white">
              <div className="text-5xl font-bold mb-4">60%</div>
              <div className="text-xl font-semibold">Faster time to interviews</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center shadow-xl text-white">
              <div className="text-5xl font-bold mb-4">2x</div>
              <div className="text-xl font-semibold">More Job Offers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Hear From Our <span className="text-indigo-600">Community</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Trusted and loved by over 600k users worldwide
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mr-3"></div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
            <span className="text-indigo-600">Simple Pricing,</span><br />
            Powerful Features
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Whether you're starting out or need extra support, we have a plan for you
          </p>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12 flex-wrap gap-2">
            <button 
              onClick={() => setPricingPeriod('weekly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${pricingPeriod === 'weekly' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setPricingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${pricingPeriod === 'monthly' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setPricingPeriod('quarterly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${pricingPeriod === 'quarterly' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Quarterly
            </button>
            <button 
              onClick={() => setPricingPeriod('yearly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${pricingPeriod === 'yearly' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Yearly (20% saved)
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
              <p className="text-gray-600 font-semibold mb-2">BASIC</p>
              <div className="text-5xl font-bold text-indigo-600 mb-4">Free</div>
              <a 
                href="/auth/login"
                className="block w-full text-center bg-white border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg font-bold mb-6 hover:bg-indigo-50 transition-colors"
              >
                START NOW
              </a>
              <p className="text-center text-gray-600 mb-6">Start your journey now!</p>
              <hr className="mb-6" />
              <p className="font-bold mb-4">What's Included:</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                  <span>AI Chat Resume Builder</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                  <span>5 Resume Scores per month</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                  <span>3 Job Position Matches per month</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                  <span>Basic Resume Templates</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-indigo-600 mr-3 flex-shrink-0" size={20} />
                  <span>Export to PDF</span>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 px-4 py-1 text-sm font-bold rounded-bl-lg">
                POPULAR
              </div>
              <p className="font-semibold mb-2">PREMIUM PLAN</p>
              <div className="mb-4">
                <span className="text-2xl line-through opacity-75">${pricingPlans[pricingPeriod].total}</span>
                <span className="text-5xl font-bold ml-2">${pricingPlans[pricingPeriod].premium}</span>
                <span className="text-xl">/{pricingPeriod === 'weekly' ? 'week' : pricingPeriod === 'monthly' ? 'month' : pricingPeriod === 'quarterly' ? 'quarter' : 'year'}</span>
              </div>
              <p className="text-sm mb-6 opacity-90">${pricingPlans[pricingPeriod].total} total</p>
              <a 
                href="/auth/login"
                className="block w-full text-center bg-white text-indigo-600 py-3 rounded-lg font-bold mb-6 hover:bg-gray-100 transition-colors"
              >
                START NOW
              </a>
              <p className="text-center text-sm mb-6 opacity-90">Pay as you go, cancel anytime.</p>
              <hr className="border-indigo-400 mb-6 opacity-30" />
              <p className="font-bold mb-4">All Free features, plus:</p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Unlimited Resume Scoring</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Unlimited Job Position Matching</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Advanced AI Chat Features</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Premium Resume Templates</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Priority Support</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Cover Letter Generator</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-white mr-3 flex-shrink-0" size={20} />
                  <span>Interview Preparation Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Have More <span className="text-indigo-600">Questions?</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Here are some of the frequently asked questions from our customers
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`text-indigo-600 transition-transform flex-shrink-0 ${openFaq === index ? 'transform rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-700 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands transforming their careers with AI-powered resume building, scoring, and job matching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/auth/login"
              className="bg-white text-indigo-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 shadow-lg inline-flex items-center justify-center transform hover:scale-105 transition-all"
            >
              <MessageSquare className="mr-2" size={20} />
              START BUILDING FOR FREE
            </a>
            <a 
              href="http://localhost:3001/auth/login"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 inline-flex items-center justify-center"
            >
              LOG IN
            </a>
          </div>
          <p className="text-indigo-200 mt-6 text-sm">
            No credit card required • Get started in seconds
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">AI Chat Builder</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Scoring</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Job Matching</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Templates</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Cover Letters</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Live Preview</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">ATS Optimization</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Position Matching</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Interview Prep</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Career Guidance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Resume Examples</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Career Tips</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-white">MyResume.ai</span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Your AI Career Copilot. Build, Score, and Optimize Your Resume 10X Faster.
            </p>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            © 2025 MyResume.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyResumeLanding;