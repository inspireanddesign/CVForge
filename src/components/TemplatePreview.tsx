import React, { useState } from 'react';
import Test001Template from './templates/Test001Template';
import ColorPicker from './ColorPicker';

interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    photo?: string;
    website?: string;
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
  profile?: string;
}

interface TemplatePreviewProps {
  template?: string;
  data: CVData;
}

export default function TemplatePreview({ template = 'test-001', data }: TemplatePreviewProps) {
  const [primaryColor, setPrimaryColor] = useState('bg-gray-900');

  const templates = {
    'test-001': Test001Template,
  };

  const SelectedTemplate = templates[template as keyof typeof templates] || Test001Template;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ColorPicker selectedColor={primaryColor} onColorChange={setPrimaryColor} />
      </div>
      <div className="w-full h-full bg-white shadow-lg">
        <SelectedTemplate data={data} primaryColor={primaryColor} />
      </div>
    </div>
  );
}