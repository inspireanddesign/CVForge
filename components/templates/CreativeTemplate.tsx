import React from 'react';

interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    photo?: string;
  };
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
  languages: string[];
}

export default function CreativeTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 w-full h-full p-8">
      {/* Header */}
      <header className="relative mb-12">
        <div className="flex items-center justify-between">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {data.personalInfo.firstName}
              <br />
              {data.personalInfo.lastName}
            </h1>
            <p className="text-xl text-gray-600 mt-2">{data.personalInfo.title}</p>
          </div>
          {data.personalInfo.photo && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full transform rotate-45 blur-lg opacity-20" />
              <img 
                src={data.personalInfo.photo} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
              />
            </div>
          )}
        </div>
        <div className="mt-6 flex space-x-6 text-gray-600">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.address}</p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="col-span-8">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mr-3" />
              Expérience professionnelle
            </h2>
            <div className="space-y-8">
              {data.experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-300 rounded-full" />
                  <div className="pl-6">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-pink-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mr-3" />
              Formation
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-300 rounded-full" />
                  <div className="pl-6">
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-pink-600 font-medium">{edu.school}</p>
                    <p className="text-gray-600">{edu.field}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-4">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mr-3" />
                Compétences
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-white rounded-full text-gray-700 shadow-sm border border-pink-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mr-3" />
                Langues
              </h2>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 bg-white rounded-full text-gray-700 shadow-sm border border-pink-100"
                  >
                    {language}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}