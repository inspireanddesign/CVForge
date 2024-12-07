import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface SkillsProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export default function Skills({ skills, onChange }: SkillsProps) {
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 50
    };
    onChange([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | number) => {
    onChange(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
              placeholder="Ex: JavaScript"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => removeSkill(skill.id)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Niveau</span>
              <span>{skill.level}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Ajouter une compétence</span>
      </button>
    </div>
  );
}