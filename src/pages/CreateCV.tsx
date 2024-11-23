import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import Section from '../components/Section';
import PersonalInfo from '../components/sections/PersonalInfo';
import Profile from '../components/sections/Profile';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import Languages from '../components/sections/Languages';
import Interests from '../components/sections/Interests';
import ColorPicker from '../components/ColorPicker';
import CVPreview from '../components/preview/CVPreview';
import PDFExport from '../components/PDFExport';
import TipsTooltip from '../components/TipsTooltip';
import { useTranslation } from 'react-i18next';

const initialData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
    additionalFields: [],
  },
  profile: '',
  education: [],
  experiences: [],
  skills: [],
  languages: [],
  interests: [],
};

export default function CreateCV() {
  const [data, setData] = useState(initialData);
  const [openSection, setOpenSection] = useState<string | null>('personalInfo');
  const [showTips, setShowTips] = useState(false);
  const [sidebarColor, setSidebarColor] = useState('bg-slate-900');
  const [headingColor, setHeadingColor] = useState('text-slate-900');
  const [showPreview, setShowPreview] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const updateData = (section: string, newData: any) => {
    setData(prev => ({ ...prev, [section]: newData }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTips(!showTips)}
              className="relative flex items-center gap-2 text-purple-600 hover:text-purple-700"
            >
              <HelpCircle className="w-5 h-5" />
              <span>{t('tips.button')}</span>
              {showTips && <TipsTooltip onClose={() => setShowTips(false)} />}
            </button>
          </div>

          {/* Mobile Preview Toggle */}
          <button
            className="lg:hidden px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? t('preview.edit') : t('preview.view')}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Sections */}
          <div className={`space-y-4 ${showPreview ? 'hidden lg:block' : 'block'}`}>
            <Section
              title={t('cv.sections.personalInfo')}
              isOpen={openSection === 'personalInfo'}
              onToggle={() => setOpenSection(openSection === 'personalInfo' ? null : 'personalInfo')}
            >
              <PersonalInfo
                data={data.personalInfo}
                onChange={(newData) => updateData('personalInfo', newData)}
              />
            </Section>

            <Section
              title={t('cv.sections.profile')}
              isOpen={openSection === 'profile'}
              onToggle={() => setOpenSection(openSection === 'profile' ? null : 'profile')}
            >
              <Profile
                value={data.profile}
                onChange={(newData) => updateData('profile', newData)}
              />
            </Section>

            <Section
              title={t('cv.sections.education')}
              isOpen={openSection === 'education'}
              onToggle={() => setOpenSection(openSection === 'education' ? null : 'education')}
            >
              <Education
                education={data.education}
                onChange={(newData) => updateData('education', newData)}
              />
            </Section>

            <Section
              title={t('cv.sections.experience')}
              isOpen={openSection === 'experience'}
              onToggle={() => setOpenSection(openSection === 'experience' ? null : 'experience')}
            >
              <Experience
                experiences={data.experiences}
                onChange={(newData) => updateData('experiences', newData)}
              />
            </Section>

            <Section
              title={t('cv.sections.skills')}
              isOpen={openSection === 'skills'}
              onToggle={() => setOpenSection(openSection === 'skills' ? null : 'skills')}
            >
              <Skills
                skills={data.skills}
                onChange={(newData) => updateData('skills', newData)}
              />
            </Section>

            <Section
              title={t('cv.sections.languages')}
              isOpen={openSection === 'languages'}
              onToggle={() => setOpenSection(openSection === 'languages' ? null : 'languages')}
            >
              <Languages
                languages={data.languages}
                onChange={(newData) => updateData('languages', newData)}
              />
            </Section>

            <Section
              title={t('cv.sections.interests')}
              isOpen={openSection === 'interests'}
              onToggle={() => setOpenSection(openSection === 'interests' ? null : 'interests')}
            >
              <Interests
                interests={data.interests}
                onChange={(newData) => updateData('interests', newData)}
              />
            </Section>
          </div>

          {/* Preview */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'} lg:h-fit`}>
            <div className="lg:sticky lg:top-24 bg-white rounded-lg shadow-lg">
              {/* Header with color picker */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    {t('preview.title')}
                  </h2>
                  <ColorPicker
                    selectedColor={sidebarColor}
                    onColorChange={({ class: bgClass, textClass }) => {
                      setSidebarColor(bgClass);
                      setHeadingColor(textClass);
                    }}
                  />
                </div>
              </div>

              {/* Scrollable preview area */}
              <div className="p-4">
                <div className="max-h-[calc(100vh-16rem)] overflow-auto">
                  <CVPreview 
                    ref={cvRef}
                    data={data}
                    sidebarColor={sidebarColor}
                    headingColor={headingColor}
                  />
                </div>
              </div>

              {/* Export button */}
              <div className="p-4 border-t border-gray-200">
                <PDFExport cvRef={cvRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}