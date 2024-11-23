import React from 'react';
import { Check } from 'lucide-react';

const colors = [
  { name: 'Slate', class: 'bg-slate-900', textClass: 'text-slate-900' },
  { name: 'Purple', class: 'bg-purple-900', textClass: 'text-purple-900' },
  { name: 'Blue', class: 'bg-blue-900', textClass: 'text-blue-900' },
  { name: 'Green', class: 'bg-green-900', textClass: 'text-green-900' },
  { name: 'Red', class: 'bg-red-900', textClass: 'text-red-900' },
  { name: 'Orange', class: 'bg-orange-900', textClass: 'text-orange-900' },
];

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: { class: string; textClass: string }) => void;
}

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.name}
          className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
          onClick={() => onColorChange(color)}
          title={color.name}
        >
          {selectedColor === color.class && (
            <Check className="w-4 h-4 text-white" />
          )}
        </button>
      ))}
    </div>
  );
}