import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
          <div className="absolute right-4 top-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-2">
            <h3 className="text-lg font-semibold text-gray-900 text-left">
              Conditions d'utilisation
            </h3>
            
            <div className="mt-4 text-sm text-gray-600">
              <p className="text-left mb-4">
                En exportant votre CV, vous acceptez les conditions suivantes :
              </p>
              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <span className="block">
                    Le CV généré est destiné à un usage personnel uniquement
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="block">
                    Vous êtes responsable de l'exactitude des informations fournies
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="block">
                    Le design du CV reste la propriété intellectuelle de CVforge
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="block">
                    Les données personnelles sont traitées conformément à notre politique de confidentialité
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              className="w-full sm:w-auto rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              className="w-full sm:w-auto rounded-lg px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
              onClick={onAccept}
            >
              Accepter et télécharger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}