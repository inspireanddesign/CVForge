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

export default function ModernTemplate({ data }: { data: CVData }) {
  return (
    <div className="bg-white w-full h-full flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-purple-700 text-white p-8">
        {data.personalInfo.photo && (
          <div className="mb-6">
            <img 
              src={data.personalInfo.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <div className="space-y-2 text-purple-100">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.address}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Compétences</h2>
            <div className="space-y-2">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-purple-600 px-3 py-1 rounded text-sm">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Langues</h2>
            <div className="space-y-2">
              {data.languages.map((language, index) => (
                <div key={index} className="bg-purple-600 px-3 py-1 rounded text-sm">
                  {language}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl text-purple-600 mt-2">{data.personalInfo.title}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            Expérience professionnelle
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-purple-200">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-2" />
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-purple-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-purple-600 pb-2">
            Formation
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-purple-200">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-[7px] top-2" />
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-purple-600">{edu.school}</p>
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
    </div>
  );
}