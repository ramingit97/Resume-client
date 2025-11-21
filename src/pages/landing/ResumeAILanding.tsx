import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle, Download, Zap, Target, Clock, Shield, ArrowRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

export default function ResumeAILanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Resume Builder",
      description: "Create professional, ATS-friendly resumes with artificial intelligence assistance"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with smart formatting"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Professional Templates",
      description: "Choose from modern, industry-specific templates designed by experts"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export to PDF",
      description: "Download your resume in high-quality PDF format ready for applications"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Preview",
      description: "See your changes instantly with live preview as you build your resume"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Privacy",
      description: "Your information is secure and private, stored safely with encryption"
    }
  ];

  const companies = [
    { name: "Google", color: "#4285F4" },
    { name: "Microsoft", color: "#00A4EF" },
    { name: "Meta", color: "#0668E1" },
    { name: "Amazon", color: "#FF9900" },
    { name: "Netflix", color: "#E50914" },
    { name: "Tesla", color: "#CC0000" }
  ];

  const beforeAfter = [
    {
      type: "before",
      title: "Without Resume AI",
      items: [
        { icon: <X className="w-5 h-5 text-red-500" />, text: "Manual formatting takes hours" },
        { icon: <X className="w-5 h-5 text-red-500" />, text: "Generic templates that don't stand out" },
        { icon: <X className="w-5 h-5 text-red-500" />, text: "Rejected by ATS systems" },
        { icon: <X className="w-5 h-5 text-red-500" />, text: "Uncertainty about content quality" }
      ]
    },
    {
      type: "after",
      title: "With Resume AI",
      items: [
        { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "Create resume in minutes with AI" },
        { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "Professional, modern designs" },
        { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "100% ATS-compatible format" },
        { icon: <CheckCircle className="w-5 h-5 text-green-500" />, text: "AI-powered content suggestions" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Resume AI
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">How it Works</a>
              <a href="#tech" className="text-gray-700 hover:text-indigo-600 transition-colors">Technology</a>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#features" className="block text-gray-700 hover:text-indigo-600">Features</a>
              <a href="#how-it-works" className="block text-gray-700 hover:text-indigo-600">How it Works</a>
              <a href="#tech" className="block text-gray-700 hover:text-indigo-600">Technology</a>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Resume Builder</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Land your <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">dream job.</span>
            <br />
            <span className="text-4xl md:text-6xl">Without the stress.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional, ATS-friendly resumes in minutes with AI assistance. 
            Built with modern technologies for the best user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all flex items-center gap-2 group">
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold hover:shadow-lg transition-all border border-gray-200">
              View Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">Trusted by job seekers at top companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {companies.map((company, i) => (
                <div key={i} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section id="how-it-works" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Say goodbye to job search <span className="text-indigo-600">frustration</span>
            </h2>
            <p className="text-xl text-gray-600">
              From constant rejections to landing your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {beforeAfter.map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                  section.type === 'before' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {section.type === 'before' ? <X className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                  <span className="font-semibold text-sm uppercase tracking-wide">{section.title}</span>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {item.icon}
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore our full suite of <span className="text-indigo-600">AI tools & features</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create the perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all border border-gray-100 group cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 bg-gradient-to-br from-indigo-600 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built with Modern Technology
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
            Powered by cutting-edge tools and frameworks for the best performance and user experience
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {['React', 'TypeScript', 'Ant Design', 'Tailwind CSS'].map((tech, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <p className="text-white font-semibold text-lg">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to build your perfect resume?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of job seekers who landed their dream jobs
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-xl transition-all flex items-center gap-2 mx-auto group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Resume AI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Build professional resumes with AI assistance. Land your dream job faster.
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
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Resume AI. Built with React, TypeScript, and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}