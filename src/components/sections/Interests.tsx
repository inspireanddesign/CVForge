import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface InterestsProps {
  interests: string[];
  onChange: (interests: string[]) => void;
}

export default function Interests({ interests, onChange }: InterestsProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!interests.includes(inputValue.trim())) {
        onChange([...interests, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeInterest = (interestToRemove: string) => {
    onChange(interests.filter(interest => interest !== interestToRemove));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ajouter un centre d'intérêt
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Appuyez sur Entrée pour ajouter"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full group"
          >
            <span>{interest}</span>
            <button
              onClick={() => removeInterest(interest)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}