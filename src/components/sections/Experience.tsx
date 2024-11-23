import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import TextEditor from '../TextEditor';

interface Experience {
  id: string;
  position: string;
  company: string;
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

interface ExperienceProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

export default function Experience({ experiences, onChange }: ExperienceProps) {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      position: '',
      company: '',
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
    onChange([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    onChange(experiences.map(exp => {
      if (exp.id === id) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return {
            ...exp,
            [parent]: {
              ...exp[parent as keyof Experience],
              [child]: value
            }
          };
        }
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp) => (
        <div key={exp.id} className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poste
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Développeur Full Stack"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employeur
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={exp.city}
                    onChange={(e) => updateExperience(exp.id, 'city', e.target.value)}
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
                      value={exp.startDate.month}
                      onChange={(e) => updateExperience(exp.id, 'startDate.month', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Mois</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={exp.startDate.year}
                      onChange={(e) => updateExperience(exp.id, 'startDate.year', e.target.value)}
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
                      value={exp.endDate.month}
                      onChange={(e) => updateExperience(exp.id, 'endDate.month', e.target.value)}
                      disabled={exp.endDate.current}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Mois</option>
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      value={exp.endDate.year}
                      onChange={(e) => updateExperience(exp.id, 'endDate.year', e.target.value)}
                      disabled={exp.endDate.current}
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
                        checked={exp.endDate.current}
                        onChange={(e) => updateExperience(exp.id, 'endDate.current', e.target.checked)}
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
                  value={exp.description}
                  onChange={(value) => updateExperience(exp.id, 'description', value)}
                  placeholder="Décrivez vos responsabilités et réalisations..."
                />
              </div>
            </div>

            <button
              onClick={() => removeExperience(exp.id)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Ajouter une expérience professionnelle</span>
      </button>
    </div>
  );
}