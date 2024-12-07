'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Eye, Loader2, X } from 'lucide-react';
import Section from '../../../components/Section';
import PersonalInfo from '../../../components/sections/PersonalInfo';
import Profile from '../../../components/sections/Profile';
import Education from '../../../components/sections/Education';
import Experience from '../../../components/sections/Experience';
import Skills from '../../../components/sections/Skills';
import Languages from '../../../components/sections/Languages';
import Interests from '../../../components/sections/Interests';
import ColorPicker from '../../../components/ColorPicker';
import CVPreview from '../../../components/preview/CVPreview';
import PDFExport from '../../../components/PDFExport';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getCvData } from '../../../utils/help'
import { isValidLocale, locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import Header from '@/components/Header';

// export function generateStaticParams() {
//   return locales.map((lang) => ({ lang }));
// }

type typeCvData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    photo: string;
    additionalFields: never[];
};
profile: string;
education: never[];
experiences: never[];
skills: never[];
languages: never[];
interests: never[];
}
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

export default function CreateCV({ lang }: { lang: string }) {
  const [data, setData] = useState<typeCvData>( Object.keys(getCvData()).length ? getCvData(): initialData);
  const [openSection, setOpenSection] = useState<string | null>('personalInfo');
  const [showPreview, setShowPreview] = useState(false);
  const [sidebarColor, setSidebarColor] = useState('bg-slate-900');
  const [headingColor, setHeadingColor] = useState('text-slate-900');
  const cvRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [dictionary, setDictionary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const API_URL =  `/api`;

  const updateData = (section: string, newData: unknown) => {
    setData((prev) => ({ ...prev, [section]: newData }));
  };

  useEffect(() => {
    // console.log('data ==>', getCvData());
    // console.log('data 2 ==>', getCvData() ? true: false);
    
    if(data){
      localStorage?.setItem('cvData', JSON.stringify(data));
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted:', data);
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/cv`, data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    async function loadDictionary() {
      if (!isValidLocale(lang)) return;
      const dict = await getDictionary(lang);
      setDictionary(dict);
      setLoading(false);
    }

    loadDictionary();
  }, [lang]);

  if (!isValidLocale(lang)) return null;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  console.log('dictionary =', dictionary);
  

  return (
    <>
      <Header lang={lang} dictionary={dictionary} />
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
          {/* Form Sections */}
          <div className="w-full lg:flex-[0.45] overflow-y-auto max-h-screen space-y-4">
            <Section
              title={dictionary.cv.sections.personalInfo}
              isOpen={openSection === 'personalInfo'}
              onToggle={() => setOpenSection(openSection === 'personalInfo' ? null : 'personalInfo')}
            >
              <PersonalInfo
                data={data.personalInfo}
                onChange={(newData) => updateData('personalInfo', newData)}
              />
            </Section>

            <Section
              title={dictionary.cv.sections.profile}
              isOpen={openSection === 'profile'}
              onToggle={() => setOpenSection(openSection === 'profile' ? null : 'profile')}
            >
              <Profile
                value={data.profile}
                onChange={(newData) => updateData('profile', newData)}
              />
            </Section>

            <Section
              title={dictionary.cv.sections.education}
              isOpen={openSection === 'education'}
              onToggle={() => setOpenSection(openSection === 'education' ? null : 'education')}
            >
              <Education
                education={data.education}
                onChange={(newData) => updateData('education', newData)}
              />
            </Section>

            <Section
              title={dictionary.cv.sections.experience}
              isOpen={openSection === 'experience'}
              onToggle={() => setOpenSection(openSection === 'experience' ? null : 'experience')}
            >
              <Experience
                experiences={data.experiences}
                onChange={(newData) => updateData('experiences', newData)}
              />
            </Section>

            <Section
              title={dictionary.cv.sections.skills}
              isOpen={openSection === 'skills'}
              onToggle={() => setOpenSection(openSection === 'skills' ? null : 'skills')}
            >
              <Skills
                skills={data.skills}
                onChange={(newData) => updateData('skills', newData)}
              />
            </Section>

            <Section
              title={dictionary.cv.sections.languages}
              isOpen={openSection === 'languages'}
              onToggle={() => setOpenSection(openSection === 'languages' ? null : 'languages')}
            >
              <Languages
                languages={data.languages}
                onChange={(newData) => updateData('languages', newData)}
              />
            </Section>

            <Section
              title={dictionary.cv.sections.interests}
              isOpen={openSection === 'interests'}
              onToggle={() => setOpenSection(openSection === 'interests' ? null : 'interests')}
            >
              <Interests
                interests={data.interests}
                onChange={(newData) => updateData('interests', newData)}
              />
            </Section>
          </div>

          {/* Desktop Preview */}
          <div className="hidden lg:block lg:sticky lg:top-24 bg-white rounded-lg shadow-lg h-fit max-h-screen overflow-hidden flex-[0.55]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{dictionary.preview.title}</h2>
              <ColorPicker
                selectedColor={sidebarColor}
                onColorChange={({ class: bgClass, textClass }) => {
                  setSidebarColor(bgClass);
                  setHeadingColor(textClass);
                }}
              />
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
              <CVPreview
                ref={cvRef}
                data={data}
                sidebarColor={sidebarColor}
                headingColor={headingColor}
                dictionary={dictionary}
              />
            </div>
            <div className="p-4 border-t border-gray-200">
              <PDFExport cvRef={cvRef} dictionary={dictionary} onSave={(e: React.FormEvent) => handleSubmit(e)} />
            </div>
          </div>
        </div>

        {/* Floating Button for Mobile */}
        <button
          className="lg:hidden fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none"
          onClick={() => setShowPreview(true)}
        >
          <Eye className="w-6 h-6" />
        </button>

        {/* Mobile Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full h-[90vh] overflow-y-auto flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">{dictionary.preview.title}</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <CVPreview
                  ref={cvRef}
                  data={data}
                  sidebarColor={sidebarColor}
                  headingColor={headingColor}
                />
              </div>
              <div className="p-4 border-t border-gray-200">
                <PDFExport cvRef={cvRef} onSave={(e: React.FormEvent) => handleSubmit(e)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
