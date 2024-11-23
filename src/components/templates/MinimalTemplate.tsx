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

export default function MinimalTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white w-full h-full p-8 text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {data.personalInfo.firstName} {data.personalInfo.lastName}
            </h1>
            <p className="text-lg text-gray-600 mt-1">{data.personalInfo.title}</p>
          </div>
          {data.personalInfo.photo && (
            <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.address}</p>
        </div>
      </header>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Expérience professionnelle</h2>
        <div className="space-y-4">
          {data.experiences.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Formation</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-600">{edu.field}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compétences</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Langues</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((language, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {language}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}