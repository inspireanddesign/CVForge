import React from 'react';
import TextEditor from '../TextEditor';

interface ProfileProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Profile({ value, onChange }: ProfileProps) {
  return (
    <div className="space-y-4">
      <TextEditor
        value={value}
        onChange={onChange}
        placeholder="Décrivez votre profil professionnel..."
      />
    </div>
  );
}