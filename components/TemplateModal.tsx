import React from 'react';
import { X, Check } from 'lucide-react';

const templates = [
  {
    id: 'test-001',
    name: 'Test 001',
    description: 'Template moderne et professionnel avec barre latérale personnalisable',
    image: '/templates/test-001.jpg',
    color: 'bg-gray-50',
  }
];

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export default function TemplateModal({ isOpen, onClose, onSelect }: TemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-6xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Choisissez votre template
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {template.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Personnalisable
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          Format ATS
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onSelect(template.id);
                          onClose();
                        }}
                        className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Utiliser ce template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}