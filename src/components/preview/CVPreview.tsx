import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin, Globe, Cake, MapPinOff, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CVPreviewProps {
  data: {
    personalInfo: {
      firstName: string;
      lastName: string;
      title: string;
      email: string;
      phone: string;
      address: string;
      photo?: string;
      additionalFields: Array<{
        id: string;
        type: string;
        value: string;
      }>;
    };
    profile: string;
    education: Array<{
      id: string;
      degree: string;
      school: string;
      city: string;
      startDate: { month: string; year: string };
      endDate: { month: string; year: string; current: boolean };
      description: string;
    }>;
    experiences: Array<{
      id: string;
      position: string;
      company: string;
      city: string;
      startDate: { month: string; year: string };
      endDate: { month: string; year: string; current: boolean };
      description: string;
    }>;
    skills: Array<{
      id: string;
      name: string;
      level: number;
    }>;
    languages: Array<{
      id: string;
      name: string;
      level: number;
    }>;
    interests: string[];
  };
  sidebarColor: string;
  headingColor: string;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data, sidebarColor, headingColor }, ref) => {
  const { t } = useTranslation();

  const getIconForField = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="w-4 h-4 text-white/60" />;
      case 'birthDate':
        return <Cake className="w-4 h-4 text-white/60" />;
      case 'birthPlace':
        return <MapPinOff className="w-4 h-4 text-white/60" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-white/60" />;
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className="w-full aspect-[1/1.4142] flex flex-col md:flex-row text-[8px] md:text-[10px] bg-white shadow-lg">
      {/* Sidebar */}
      <div data-column="left" className={`w-full md:w-1/3 ${sidebarColor} text-white p-4 md:p-6`}>
        {/* Photo and Name */}
        <div className="text-center md:text-left mb-4">
          {data.personalInfo.photo && (
            <div className="mb-3">
              <img
                src={data.personalInfo.photo}
                alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                className="w-16 h-16 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>
          )}
          <h1 className="text-base font-bold mb-0.5">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-[9px] opacity-90">{data.personalInfo.title}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2">{t('cv.sections.personalInfo')}</h2>
          <div className="space-y-1.5">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-white/60" />
                <span className="text-[8px] opacity-90 break-all">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-white/60" />
                <span className="text-[8px] opacity-90">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.address && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white/60" />
                <span className="text-[8px] opacity-90">{data.personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        {data.personalInfo.additionalFields.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2">{t('cv.sections.additionalInfo')}</h2>
            <div className="space-y-1.5">
              {data.personalInfo.additionalFields.map((field) => (
                <div key={field.id} className="flex items-center gap-1.5">
                  {getIconForField(field.type)}
                  <span className="text-[8px] opacity-90">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2">{t('cv.sections.skills')}</h2>
            <div className="space-y-1.5">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="text-[8px] mb-0.5">
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
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-2">{t('cv.sections.languages')}</h2>
            <div className="space-y-1.5">
              {data.languages.map((language) => (
                <div key={language.id}>
                  <div className="text-[8px] mb-0.5">
                    <span>{language.name}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-white rounded-full h-1"
                      style={{ width: `${language.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {data.interests.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-2">{t('cv.sections.interests')}</h2>
            <div className="flex flex-wrap gap-1">
              {data.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-white/10 rounded-full text-[7px]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div data-column="right" className="w-full md:w-2/3 p-4 md:p-6">
        {/* Profile */}
        {data.profile && (
          <section className="mb-6">
            <h2 className={`text-sm font-bold ${headingColor} mb-2`}>{t('cv.sections.profile')}</h2>
            <div 
              className="text-[8px] text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.profile }}
            />
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className={`text-sm font-bold ${headingColor} mb-2`}>{t('cv.sections.education')}</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="relative pl-3 border-l border-gray-200">
                  <div className="absolute w-1.5 h-1.5 bg-gray-200 rounded-full -left-[3px] top-1.5" />
                  <h3 className="text-[9px] font-semibold">{edu.degree}</h3>
                  <p className="text-[8px] text-gray-600">{edu.school}</p>
                  <p className="text-[7px] text-gray-500">
                    {edu.startDate.month} {edu.startDate.year} - {edu.endDate.current ? t('common.present') : `${edu.endDate.month} ${edu.endDate.year}`}
                  </p>
                  {edu.description && (
                    <div 
                      className="mt-0.5 text-[8px] text-gray-600"
                      dangerouslySetInnerHTML={{ __html: edu.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <section>
            <h2 className={`text-sm font-bold ${headingColor} mb-2`}>{t('cv.sections.experience')}</h2>
            <div className="space-y-3">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l border-gray-200">
                  <div className="absolute w-1.5 h-1.5 bg-gray-200 rounded-full -left-[3px] top-1.5" />
                  <h3 className="text-[9px] font-semibold">{exp.position}</h3>
                  <p className="text-[8px] text-gray-600">{exp.company}</p>
                  <p className="text-[7px] text-gray-500">
                    {exp.startDate.month} {exp.startDate.year} - {exp.endDate.current ? t('common.present') : `${exp.endDate.month} ${exp.endDate.year}`}
                  </p>
                  {exp.description && (
                    <div 
                      className="mt-0.5 text-[8px] text-gray-600"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';

export default CVPreview;