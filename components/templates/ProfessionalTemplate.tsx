import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    photo?: string;
    profile?: string;
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
    gpa?: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
  }>;
  languages: string[];
}

interface ProfessionalTemplateProps {
  data: CVData;
  primaryColor?: string;
}

export default function ProfessionalTemplate({ data, primaryColor = 'bg-gray-900' }: ProfessionalTemplateProps) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`w-[280px] ${primaryColor} text-white p-8`}>
        {/* Photo */}
        {data.personalInfo.photo ? (
          <div className="mb-8">
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-8" />
        )}

        {/* Name */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-white/80 mt-1">{data.personalInfo.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Contacts</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-white/60" />
              <span className="text-sm">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-white/60" />
              <span className="text-sm">{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white/60" />
              <span className="text-sm">{data.personalInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Skills</h2>
          <div className="space-y-3">
            {data.skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1">
                  <div
                    className="bg-white rounded-full h-1"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Languages</h2>
          <div className="space-y-2">
            {data.languages.map((language, index) => (
              <div key={index} className="text-sm">
                {language}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        {/* Profile */}
        {data.personalInfo.profile && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
            <p className="text-gray-600 leading-relaxed">
              {data.personalInfo.profile}
            </p>
          </section>
        )}

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {data.experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-gray-600">{edu.field}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}