import React from 'react';
import { FileText, Upload, Palette, Clock, Download, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Upload className="h-6 w-6 text-purple-600" />,
    title: 'Smart Import',
    description: 'Upload your existing CV and our AI will extract all the information automatically.'
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-600" />,
    title: 'Beautiful Templates',
    description: 'Choose from 5 professionally designed templates that stand out from the crowd.'
  },
  {
    icon: <Clock className="h-6 w-6 text-purple-600" />,
    title: 'Real-time Preview',
    description: 'See changes instantly as you type with our live preview feature.'
  },
  {
    icon: <Download className="h-6 w-6 text-purple-600" />,
    title: 'Easy Export',
    description: 'Download your CV in PDF format, ready to send to employers.'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    title: 'AI Enhancement',
    description: 'Get smart suggestions to improve your CV content and structure.'
  },
  {
    icon: <FileText className="h-6 w-6 text-purple-600" />,
    title: 'ATS-Friendly',
    description: 'Ensure your CV passes Applicant Tracking Systems with our optimized formats.'
  }
];

export default function Features() {
  return (
    <section id="features" className="pt-32 md:pt-48 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to create the perfect CV
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Powerful features that make CV creation simple and effective
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-purple-100 hover:border-purple-200 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}