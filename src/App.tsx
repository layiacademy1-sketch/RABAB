/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flower2, 
  ChevronRight, 
  ArrowLeft, 
  Construction, 
  TrendingUp, 
  Wallet, 
  Briefcase,
  Plus
} from 'lucide-react';

// --- Types ---

type View = 'loading' | 'dashboard' | 'business-list' | 'business-detail';

interface Business {
  id: string;
  name: string;
  subtitle?: string;
  status: 'active' | 'coming-soon' | 'special';
  monthlyGain?: number;
  weeklyGain?: number;
  info?: {
    nom: string;
    mail: string;
    telephone: string;
    snapchat: string;
  };
}

// --- Constants ---

const BUSINESSES: Business[] = [
  { 
    id: 'oasis', 
    name: 'OASIS', 
    subtitle: 'Formation Snapchat', 
    status: 'special',
    info: {
      nom: 'OASIS',
      mail: 'non communiqué',
      telephone: '06 67 66 09 74',
      snapchat: 'oasispomcassis6'
    }
  },
  { 
    id: 'reselshop', 
    name: 'RESELSHOP', 
    subtitle: 'Formation Snapchat', 
    status: 'special',
    info: {
      nom: 'RESELSHOP',
      mail: 'non communiqué',
      telephone: 'non communiqué',
      snapchat: 'iam_reselshop'
    }
  },
];

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void, key?: React.Key }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Flower2 className="w-24 h-24 text-[#FACC15] animate-spin-slow" />
      </motion.div>
      <motion.h1 
        className="text-4xl font-bold text-white tracking-[0.2em] mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        RABAB
      </motion.h1>
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#FACC15]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/50 mt-4 font-mono text-sm">{progress}%</p>
    </div>
  );
};

const Dashboard = ({ onNavigate }: { onNavigate: (view: View) => void, key?: React.Key }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 max-w-md mx-auto min-h-screen flex flex-col"
    >
      <header className="mb-12 pt-8">
        <h2 className="text-xs font-bold tracking-[0.3em] text-[#FACC15] uppercase">Business</h2>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Total Generated Block */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white w-full aspect-square rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl"
        >
          <p className="text-black/60 text-sm font-medium mb-2 uppercase tracking-wider">Total généré depuis le début</p>
          <h3 className="text-black text-6xl font-bold">810 €</h3>
        </motion.div>

        {/* Action Section */}
        <div className="w-full space-y-4">
          <button 
            onClick={() => onNavigate('business-list')}
            className="w-full bg-[#FACC15] text-black font-bold py-5 rounded-2xl flex items-center justify-center space-x-3 active:scale-95 transition-transform"
          >
            <Briefcase className="w-5 h-5" />
            <span>ACCÈS AUX TÂCHES</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BusinessList = ({ onBack, onSelect }: { onBack: () => void, onSelect: (b: Business) => void, key?: React.Key }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-black p-6 z-40 overflow-y-auto"
    >
      <button onClick={onBack} className="mb-8 p-2 -ml-2 text-white/60 hover:text-white flex items-center space-x-2">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Retour</span>
      </button>

      <h2 className="text-3xl font-bold text-white mb-8">Tâches à effectuer</h2>

      <div className="space-y-4">
        {BUSINESSES.map((business) => (
          <motion.div
            key={business.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(business)}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${business.status === 'coming-soon' ? 'bg-white/5' : 'bg-[#FACC15]/10'}`}>
                {business.status === 'coming-soon' ? (
                  <Construction className="w-6 h-6 text-white/40" />
                ) : business.status === 'special' ? (
                  <Flower2 className="w-6 h-6 text-[#FACC15]" />
                ) : (
                  <TrendingUp className="w-6 h-6 text-[#FACC15]" />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold">{business.name}</h3>
                <p className="text-white/40 text-xs">
                  {business.subtitle || (business.status === 'coming-soon' ? 'Bientôt disponible' : 'Actif')}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-8 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-white/20">
        <Plus className="w-8 h-8 mb-2" />
        <p className="text-sm font-medium">Ajouter un business</p>
      </div>
    </motion.div>
  );
};

const BusinessDetail = ({ business, onBack }: { business: Business, onBack: () => void, key?: React.Key }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-black p-6 z-50 overflow-y-auto"
    >
      <button onClick={onBack} className="mb-8 p-2 -ml-2 text-white/60 hover:text-white flex items-center space-x-2">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Retour</span>
      </button>

      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#FACC15] p-3 rounded-2xl">
            <Briefcase className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-4xl font-bold text-white">{business.name}</h2>
        </div>
        {business.status === 'coming-soon' && (
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Construction className="w-4 h-4 text-[#FACC15]" />
            <span className="text-[#FACC15] text-xs font-bold uppercase tracking-widest">Bientôt disponible</span>
          </div>
        )}
      </div>

      {business.status === 'special' && business.info ? (
        <div className="space-y-6">
          <h3 className="text-[#FACC15] text-xl font-bold border-b border-white/10 pb-2">Informations :</h3>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-white/40 text-xs uppercase mb-1">Nom</p>
              <p className="text-white text-lg font-medium">{business.info.nom}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-white/40 text-xs uppercase mb-1">Mail</p>
              <p className="text-white text-lg font-medium">{business.info.mail}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-white/40 text-xs uppercase mb-1">Téléphone</p>
              <p className="text-white text-lg font-medium">{business.info.telephone}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-white/40 text-xs uppercase mb-1">Snapchat</p>
              <p className="text-[#FACC15] text-lg font-bold">{business.info.snapchat}</p>
            </div>
          </div>
        </div>
      ) : business.status === 'active' ? (
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Gains ce mois</p>
            <p className="text-white text-4xl font-bold">{business.monthlyGain} €</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Gains cette semaine</p>
            <p className="text-white text-4xl font-bold">{business.weeklyGain} €</p>
          </div>
          
          <div className="mt-8">
            <h4 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">Dernières activités</h4>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-white/20 italic">
              Aucune activité récente
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Construction className="w-20 h-20 text-white/10 mb-6" />
          <h3 className="text-white/60 text-xl font-bold mb-2">En cours de développement</h3>
          <p className="text-white/30 text-sm max-w-xs">
            Nous travaillons activement sur l'intégration de ce business. Revenez bientôt !
          </p>
        </div>
      )}
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('loading');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  const handleBusinessSelect = (business: Business) => {
    setSelectedBusiness(business);
    setView('business-detail');
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FACC15] selection:text-black">
      <AnimatePresence mode="wait">
        {view === 'loading' && (
          <LoadingScreen key="loading" onComplete={() => setView('dashboard')} />
        )}

        {view === 'dashboard' && (
          <Dashboard key="dashboard" onNavigate={setView} />
        )}

        {view === 'business-list' && (
          <BusinessList 
            key="list" 
            onBack={() => setView('dashboard')} 
            onSelect={handleBusinessSelect}
          />
        )}

        {view === 'business-detail' && selectedBusiness && (
          <BusinessDetail 
            key="detail" 
            business={selectedBusiness} 
            onBack={() => setView('business-list')} 
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
