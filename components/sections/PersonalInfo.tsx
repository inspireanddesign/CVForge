import React, { useRef } from 'react';
import { Camera, Plus } from 'lucide-react';

interface AdditionalField {
  id: string;
  type: string;
  value: string;
  label: string;
}

interface PersonalInfoProps {
  data: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    photo?: string;
    additionalFields: AdditionalField[];
  };
  onChange: (data: any) => void;
}

const AVAILABLE_FIELDS = {
  birthDate: 'Date de naissance',
  birthPlace: 'Lieu de naissance',
  nationality: 'Nationalité',
  civilStatus: 'État civil',
  website: 'Site internet',
  linkedin: 'LinkedIn',
};

export default function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        handleChange('photo', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const addField = (type: string) => {
    const newField = {
      id: Date.now().toString(),
      type,
      value: '',
      label: AVAILABLE_FIELDS[type as keyof typeof AVAILABLE_FIELDS],
    };
    const updatedFields = [...data.additionalFields, newField];
    onChange({ ...data, additionalFields: updatedFields });
  };

  const removeField = (id: string) => {
    const updatedFields = data.additionalFields.filter(
      (field) => field.id !== id
    );
    onChange({ ...data, additionalFields: updatedFields });
  };

  const updateField = (id: string, value: string) => {
    const updatedFields = data.additionalFields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    onChange({ ...data, additionalFields: updatedFields });
  };

  // Get list of field types that are already added
  const usedFieldTypes = new Set(data.additionalFields.map((field) => field.type));

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-[120px,1fr] gap-6">
        {/* Photo Upload */}
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div
            className="w-full aspect-square max-w-[120px] mx-auto bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative"
            onClick={triggerImageUpload}
          >
            {data.photo ? (
              <>
                <img
                  src={data.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-purple-600 hover:text-purple-700 transition-colors">
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-sm text-center">Ajouter une photo</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre professionnel
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Email, Téléphone et Adresse */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adresse
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Additional Fields */}
      <div className="space-y-4">
        {data.additionalFields.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="flex gap-2">
                <input
                  type={field.type === 'birthDate' ? 'date' : 'text'}
                  value={field.value}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => removeField(field.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Field Buttons - Only show buttons for unused fields */}
      {Object.entries(AVAILABLE_FIELDS).length > usedFieldTypes.size && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(AVAILABLE_FIELDS).map(([type, label]) => {
            if (!usedFieldTypes.has(type)) {
              return (
                <button
                  key={type}
                  onClick={() => addField(type)}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:border-purple-400 transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}