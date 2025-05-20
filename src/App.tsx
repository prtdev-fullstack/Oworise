import React from 'react';
import { Calculator, TrendingUp, DollarSign, LineChart, LogOut } from 'lucide-react';
import { CommercialDiscount } from './components/CommercialDiscount';
import { RationalDiscount } from './components/RationalDiscount';
import { Agios } from './components/Agios';
import { Rates } from './components/Rates';
import { EquivalentDates } from './components/EquivalentDates';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { useAuth } from './contexts/AuthContext';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <header className="glass-effect sticky top-0 z-50 shadow-lg border-b border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-slide-in">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg animate-float">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  OWORISE
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  Application de Calculs Financiers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 transition-colors">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Analyses Financières</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 transition-colors">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm font-medium">Calculs Précis</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 transition-colors">
                  <LineChart className="h-5 w-5" />
                  <span className="text-sm font-medium">Résultats Professionnels</span>
                </div>
              </div>
              <ThemeToggle />
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 transition-all"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <StudentDashboard />
      </main>

      <footer className="glass-effect mt-16 border-t border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left transition-colors">
              © 2025 FinMath Pro - Application Professionnelle de Calculs Financiers
            </p>
            <div className="flex items-center gap-6">
              <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">
                Support
              </span>
              <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">
                Documentation
              </span>
              <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition-colors">
                Contact
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;