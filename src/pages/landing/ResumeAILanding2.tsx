import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle, Download, Zap, Target, Clock, Users, ArrowRight, Github, Linkedin, Mail, Menu, X, Star, Award, TrendingUp } from 'lucide-react';

export default function ResumeAILanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI Keyword Targeting",
      description: "Automatically add missing job-specific keywords to your resume"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Summary Writer",
      description: "Create a tailored professional summary for your desired position"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Real-Time Content Analysis",
      description: "Instantly identifies common content errors and improvements"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "The Rezi Score",
      description: "Critiques your resume across 23 criteria with actionable feedback"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "20+ ATS-Friendly Templates",
      description: "Professional templates designed to pass applicant tracking systems"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Custom URL Sharing",
      description: "Generate personalized secure links to share your resume anywhere"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "No card required",
      description: "Get a feel for how it works. No payment required.",
      buttonText: "Get started",
      buttonVariant: "outline",
      features: [
        "Basic resume builder",
        "1 resume template",
        "Limited AI features"
      ]
    },
    {
      name: "Pro",
      price: "$29 Monthly",
      description: "Access to all features plus unlimited AI Credits & free monthly review.",
      buttonText: "Get started",
      buttonVariant: "primary",
      popular: true,
      guarantee: "100% money-back guarantee",
      features: [
        "Unlimited resumes",
        "All 20+ templates",
        "Full AI features",
        "Priority support"
      ]
    },
    {
      name: "Lifetime",
      price: "$149 One-Time",
      description: "Access to all Rezi features with a one-time payment.",
      buttonText: "Get started",
      buttonVariant: "outline",
      guarantee: "100% money-back guarantee",
      features: [
        "Lifetime access",
        "All features included",
        "One-time payment",
        "Future updates"
      ]
    }
  ];

  const stats = [
    { label: "Resume Score", value: "837+" },
    { label: "Professional Samples", value: "3M+" },
    { label: "Trusted Users", value: "5-min" },
    { label: "Time to Create", value: "100%" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Resume AI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#examples" className="text-gray-600 hover:text-gray-900 transition-colors">Examples</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Create your resume
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t">
              <a href="#features" className="block text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#examples" className="block text-gray-600 hover:text-gray-900">Examples</a>
              <a href="#faq" className="block text-gray-600 hover:text-gray-900">FAQ</a>
              <button className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg">
                Create your resume
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ready to build<br />your resume?
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Join over 3 million people who use Resume AI to take control of their job search.
          </p>

          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg inline-flex items-center gap-2">
            Create your resume
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Hero Image Placeholder */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="aspect-[3/4] bg-white rounded border border-gray-300 mb-4 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-300" />
              </div>
              <div className="text-sm text-gray-600">My First Resume</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="aspect-[3/4] bg-white rounded border border-gray-300 mb-4 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-300" />
              </div>
              <div className="text-sm text-gray-600">Marketing Resume</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="aspect-[3/4] bg-white rounded border border-gray-300 mb-4 flex items-center justify-center">
                <FileText className="w-16 h-16 text-gray-300" />
              </div>
              <div className="text-sm text-gray-600">Tech Resume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Intro */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-3">Even more reasons to love Resume AI</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Resume AI Does More Than Any<br />Other Resume Builder.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Resume AI makes it easy to get the help you need, stay organized, and take on any challenge. Its clear, simple design just makes sense.
            </p>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Create Free Resume
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Focused Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-3">Its never been easier to make your resume</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">Content-focused</span> features<br />
              developed to get you hired
            </h2>
            <button className="mt-6 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors">
              Create Free Resume
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-indigo-900 to-blue-700 rounded-2xl p-8 text-white min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg mb-4">AI Keyword Targeting Demo</div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-sm text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Marketing Strategy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Marketing Objectives</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">ATS Keyword Targeting</h3>
                <p className="text-gray-600">
                  Instantly improve your chances of being selected for an interview by using the targeted keywords identified by Resume AI.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Real Time Content Analysis</h3>
                <p className="text-gray-600">
                  Resume AI instantly identifies common content errors such as missing bullet points, buzz words, useful content, and more.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Rezi Score</h3>
                <p className="text-gray-600">
                  The Rezi Score critiques how well you've created your resume across 23 criteria points - translating the result into a score rated from 1 - 100.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-3">Respectful pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose From The Most Popular Plans
            </h2>
            <p className="text-gray-600">
              Satisfaction promised with a 100% money back guarantee
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-indigo-900 to-blue-700 text-white shadow-2xl scale-105' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="mb-6">
                  <div className={`text-sm font-medium mb-2 ${plan.popular ? 'text-blue-200' : 'text-gray-600'}`}>
                    {plan.price}
                  </div>
                  <h3 className={`text-3xl font-bold mb-3 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors mb-4 ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : plan.popular
                      ? 'bg-white text-blue-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.buttonText}
                </button>

                {plan.guarantee && (
                  <div className={`text-center text-sm flex items-center justify-center gap-2 ${
                    plan.popular ? 'text-green-300' : 'text-green-600'
                  }`}>
                    <CheckCircle className="w-4 h-4" />
                    {plan.guarantee}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-200 mb-3">The smartest AI for resume & cover letter writing</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              20+ ATS-Friendly Resume Templates
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-2xl">
              <div className="aspect-[3/4] bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                <FileText className="w-24 h-24 text-gray-300" />
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold mb-4">Modern Resume Template</h3>
              <p className="text-blue-100 mb-6">
                Our newest resume template developed with attractive colors, clean lines, and high content density. Resume AI recommends this format for all users.
              </p>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors">
                Create Free Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Samples */}
      <section id="examples" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-medium mb-3">Real-life successful resume examples</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse <span className="text-blue-600">837 Professional Resume Samples</span> And<br />
              Find One For Your Job Title.
            </h2>
            <p className="text-gray-600 mb-8">
              Learn what matters most in your industry & create a job-winning resume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors">
                View All Examples
              </button>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Create Free Resume
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['Rezi', 'IBM', 'Deloitte', 'Facebook', 'Google'].map((company, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-white rounded border border-gray-300 mb-3 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-300" />
                </div>
                <div className="text-sm font-semibold text-gray-900">{company}</div>
                <div className="text-xs text-gray-600">Sample Resume</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature Hero */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 mb-4">The smartest AI for resume & cover letter writing</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Resume + cover letter ready in 5 minutes. Perfectly optimized.
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            No job interview callbacks? Maybe your resume isn't up to par. Let Resume AI help. Our AI resume maker follows best practices and understands what kind of skills and experience employers need.
          </p>
          
          <div className="bg-white rounded-lg p-8 text-left max-w-2xl mx-auto">
            <div className="text-sm text-gray-600 mb-4">WHAT WAS YOUR ROLE AT THE COMPANY?</div>
            <input 
              type="text" 
              placeholder="Marketing Analyst"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 text-gray-900"
            />
            <div className="text-sm text-gray-600 mb-4">WHAT DID YOU DO AT THE COMPANY?</div>
            <textarea 
              placeholder="•"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-gray-900 min-h-[120px]"
            />
            <div className="flex justify-between items-center mb-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                AI WRITER GENERATE
              </button>
              <div className="text-sm text-gray-600">⚡ 3622K</div>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              SAVE TO EXPERIENCE LIST
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-blue-600 font-medium mb-2">The best resume builder in the world</p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trusted by Over <span className="text-blue-600">3,365,312</span>
            </h3>
            <p className="text-gray-600 mt-2">Hear from some of our amazing customers</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-medium mb-3">Support</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions (FAQs)
            </h2>
            <div className="flex gap-4 justify-center mb-12">
              <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">AI Resume</button>
              <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">Pricing</button>
              <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">Formats</button>
              <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium">Partners</button>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Why would I use an AI resume builder?",
                a: "An AI resume maker helps you build a resume perfectly fit for the job you want. Top-notch AI resume builders are designed to speak the language hiring managers are looking for, increasing your chances of standing out in the crowd."
              },
              {
                q: "What's the best way to use an AI resume builder?",
                a: "To get the most out of an AI resume builder, either start from scratch or upload your current resume. Fill in as much detail as possible about your career and skills, and upload the job description you're targeting."
              },
              {
                q: "Aren't all resumes written with AI similar?",
                a: "AI-generated resumes can seem similar if you're not giving personalized inputs or if you're using basic prompts. Provide specific details about your work experience and target the job you're eyeing."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Resume AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Build professional resumes with AI assistance. Join millions of job seekers.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2024 Resume AI. Built with React, TypeScript, Ant Design and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}