import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  level: number;
}

interface LanguagesProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export default function Languages({ languages, onChange }: LanguagesProps) {
  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: '',
      level: 50
    };
    onChange([...languages, newLanguage]);
  };

  const removeLanguage = (id: string) => {
    onChange(languages.filter(lang => lang.id !== id));
  };

  const updateLanguage = (id: string, field: keyof Language, value: string | number) => {
    onChange(languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  return (
    <div className="space-y-4">
      {languages.map((language) => (
        <div key={language.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={language.name}
              onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
              placeholder="Ex: Anglais"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => removeLanguage(language.id)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Niveau</span>
              <span>{language.level}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={language.level}
              onChange={(e) => updateLanguage(language.id, 'level', parseInt(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addLanguage}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Ajouter une langue</span>
      </button>
    </div>
  );
}