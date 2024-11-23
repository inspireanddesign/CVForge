import React from 'react';
import { Check, FileText, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = {
  free: [
    'Création de CV basique',
    'Templates standards',
    'Export PDF',
    'Sauvegarde en ligne',
  ],
  premium: [
    'Tous les avantages gratuits',
    'Templates premium exclusifs',
    'Import de CV existant',
    'Suggestions IA avancées',
    'Support prioritaire',
    'Sans filigrane',
  ],
};

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Des prix simples et transparents
          </h2>
          <p className="text-xl text-gray-600">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-purple-100 p-8 hover:border-purple-200 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Basique
                </h3>
                <p className="text-gray-600 mt-1">Pour démarrer facilement</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">0 FCFA</p>
                <p className="text-gray-600">Gratuit</p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/create')}
              className="w-full px-6 py-3 text-purple-600 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Commencer gratuitement
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              Populaire
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Crown className="h-6 w-6" />
                  Premium
                </h3>
                <p className="text-purple-100 mt-1">Pour les professionnels</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">655 FCFA</p>
                <p className="text-purple-100">≈ 1€</p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-purple-200 flex-shrink-0" />
                  <span className="text-purple-50">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('/create?plan=premium')}
              className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              Commencer maintenant
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Paiement sécurisé · Satisfait ou remboursé · Support 24/7
          </p>
        </div>
      </div>
    </section>
  );
}