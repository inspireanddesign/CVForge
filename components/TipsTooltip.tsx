import React, { useEffect, useRef } from 'react';

interface TipsTooltipProps {
  onClose: () => void;
}

export default function TipsTooltip({ onClose }: TipsTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={tooltipRef}
      className="absolute left-0 top-full mt-2 w-96 p-4 bg-white rounded-lg shadow-lg border border-purple-100 z-50"
    >
      <div className="space-y-4 text-sm text-gray-600">
        <h3 className="text-base font-medium text-gray-900 text-left">
          Conseils pour concevoir un CV efficace :
        </h3>

        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-left">
            1. Adaptez votre CV à chaque poste :
          </p>
          <p className="text-left">
            Lisez attentivement l'offre d'emploi et ajustez votre CV en mettant en avant les compétences, expériences et réalisations qui correspondent spécifiquement au poste visé.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-left">
            2. Soyez clair et concis :
          </p>
          <p className="text-left">
            Un CV doit être facile à lire. Limitez-le à une ou deux pages maximum. Évitez les longs paragraphes : utilisez des points pour lister les informations.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-left">
            3. Mettez en valeur vos réalisations :
          </p>
          <p className="text-left">
            Au lieu de décrire simplement vos responsabilités, mentionnez vos accomplissements avec des chiffres ou des résultats mesurables (exemple : "Augmentation de la productivité de l'équipe de 15 %").
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-left">
            4. Utilisez des mots-clés :
          </p>
          <p className="text-left">
            Intégrez des mots-clés tirés de l'offre d'emploi, car certains recruteurs utilisent des logiciels de suivi (ATS) pour filtrer les candidatures.
          </p>
        </div>
      </div>
    </div>
  );
}