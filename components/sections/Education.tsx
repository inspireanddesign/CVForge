import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import TextEditor from '../TextEditor';

interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  startDate: {
    month: string;
    year: string;
  };
  endDate: {
    month: string;
    year: string;
    current: boolean;
  };
  description: string;
}

interface EducationProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

export default function Education({ education, onChange }: EducationProps) {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      city: '',
      startDate: {
        month: '',
        year: '',
      },
      endDate: {
        month: '',
        year: '',
        current: false,
      },
      description: '',
    };
    onChange([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: string, value: any) => {
    onChange(education.map((edu: any) => {
      if (edu.id === id) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return {
            ...edu,
            [parent]: {
              ...edu[parent as keyof Education],
              [child]: value
            }
          };
        }
        return { ...edu, [field]: value };
      }
      return edu;
    }));
  };

  return (
    <div className="space-y-6">
      {education.map((edu) => (
        <div key={edu.id} className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Formation
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Master en Informatique"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Établissement
                  </label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={edu.city}
                    onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={edu.startDate.month}
                      onChange={(e) => updateEducation(edu.id, 'startDate.month', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Mois</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={edu.startDate.year}
                      onChange={(e) => updateEducation(edu.id, 'startDate.year', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Année</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de fin
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={edu.endDate.month}
                      onChange={(e) => updateEducation(edu.id, 'endDate.month', e.target.value)}
                      disabled={edu.endDate.current}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Mois</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={edu.endDate.year}
                      onChange={(e) => updateEducation(edu.id, 'endDate.year', e.target.value)}
                      disabled={edu.endDate.current}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Année</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={edu.endDate.current}
                        onChange={(e) => updateEducation(edu.id, 'endDate.current', e.target.checked)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">ce jour</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <TextEditor
                  value={edu.description}
                  onChange={(value) => updateEducation(edu.id, 'description', value)}
                  placeholder="Décrivez votre formation..."
                />
              </div>
            </div>

            <button
              onClick={() => removeEducation(edu.id)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Ajouter une formation</span>
      </button>
    </div>
  );
}