/**
 * Login Page Component
 * Interface d'authentification avec support de 5 test users
 */

import React, { useState } from 'react';
import { Mail, Lock, Loader, AlertCircle } from 'lucide-react';
import { loginUser, saveUserSession } from '../lib/auth';
import { loginUserDemo } from '../lib/authDemo';
import { useAppContext } from '../context/AppContext';

interface TestUser {
  email: string;
  password: string;
  name: string;
  label: string;
  color: string;
}

interface TestUser {
  email: string;
  password: string;
  name: string;
  label: string;
  color: string;
}

const TEST_USERS: TestUser[] = [
  {
    email: 'admin@mentora.com',
    password: 'admin123',
    name: 'Fatima Admin',
    label: 'Admin',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    email: 'youssef@mentora.com',
    password: 'user123',
    name: 'Youssef Data Entry',
    label: 'Data Entry',
    color: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    email: 'amina@mentora.com',
    password: 'user123',
    name: 'Amina Data Entry',
    label: 'Data Entry',
    color: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    email: 'karim@mentora.com',
    password: 'user123',
    name: 'Karim Data Entry',
    label: 'Data Entry',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    email: 'salma@mentora.com',
    password: 'user123',
    name: 'Salma Data Entry',
    label: 'Data Entry',
    color: 'bg-indigo-600 hover:bg-indigo-700',
  },
];

export function LoginPage() {
  const { setCurrentUser } = useAppContext();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Traite le formulaire de login
   * Essaie d'abord Supabase, puis fallback au mode démo si non configuré
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Essaie d'abord avec Supabase
      let result = await loginUser(email, password);

      // Si Supabase n'est pas configuré (signal spécial), utilise le mode démo
      if (result.error === 'supabase_not_configured') {
        console.warn('⚠️ Supabase non configuré, passage au mode démo');
        result = await loginUserDemo(email, password);
      }

      if (result.error || !result.user || !result.token) {
        setError(result.error || 'Erreur de connexion');
        setIsLoading(false);
        return;
      }

      // Sauvegarde la session
      saveUserSession(result.user, result.token);

      // Convertit AuthUser en User pour le context
      const user = {
        id: result.user.id,
        name: result.user.name,
        role: result.user.role as 'admin' | 'data_entry',
        avatar: result.user.avatar,
      };

      setCurrentUser(user);
    } catch (err) {
      console.error('Login error:', err);
      // Si la requête Supabase échoue complètement, essaie le mode démo
      try {
        const demoResult = await loginUserDemo(email, password);
        if (!demoResult.error && demoResult.user && demoResult.token) {
          saveUserSession(demoResult.user, demoResult.token);
          const user = {
            id: demoResult.user.id,
            name: demoResult.user.name,
            role: demoResult.user.role as 'admin' | 'data_entry',
            avatar: demoResult.user.avatar,
          };
          setCurrentUser(user);
        } else {
          setError(demoResult.error || 'Erreur lors de la connexion');
        }
      } catch (demoErr) {
        setError('Erreur lors de la connexion');
        console.error('Demo login error:', demoErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Demo login avec un test user préconfiguré
   */
  const handleDemoLogin = async (testUser: TestUser) => {
    setError('');
    setIsLoading(true);

    try {
      // Essaie d'abord avec Supabase
      let result = await loginUser(testUser.email, testUser.password);

      // Si Supabase n'est pas configuré (signal spécial), utilise le mode démo
      if (result.error === 'supabase_not_configured') {
        console.warn('⚠️ Supabase non configuré, passage au mode démo');
        result = await loginUserDemo(testUser.email, testUser.password);
      }

      if (result.error || !result.user || !result.token) {
        setError(result.error || 'Erreur de connexion');
        setIsLoading(false);
        return;
      }

      // Sauvegarde la session
      saveUserSession(result.user, result.token);

      // Convertit AuthUser en User pour le context
      const user = {
        id: result.user.id,
        name: result.user.name,
        role: result.user.role as 'admin' | 'data_entry',
        avatar: result.user.avatar,
      };

      setCurrentUser(user);
    } catch (err) {
      console.error('Demo login error:', err);
      // Fallback au mode démo complet
      try {
        const demoResult = await loginUserDemo(testUser.email, testUser.password);
        if (!demoResult.error && demoResult.user && demoResult.token) {
          saveUserSession(demoResult.user, demoResult.token);
          const user = {
            id: demoResult.user.id,
            name: demoResult.user.name,
            role: demoResult.user.role as 'admin' | 'data_entry',
            avatar: demoResult.user.avatar,
          };
          setCurrentUser(user);
        } else {
          setError(demoResult.error || 'Erreur de connexion');
        }
      } catch (demoErr) {
        setError('Erreur lors de la connexion');
        console.error('Demo mode error:', demoErr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex">
      {/* Gauche: Branding (caché sur mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="text-center text-white max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
              <div className="text-3xl font-bold text-blue-600">📊</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">DataIngest</h1>
          <p className="text-lg text-blue-100 mb-8">Plateforme complète de gestion de données pédagogiques</p>

          <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-400/30">
            <h3 className="font-semibold mb-3 text-left">Fonctionnalités :</h3>
            <ul className="text-sm text-left space-y-2 text-blue-100">
              <li>✨ Saisie structurée de données</li>
              <li>📈 Dashboard administrateur</li>
              <li>👥 Gestion multi-utilisateurs</li>
              <li>📄 Export/Import de documents</li>
              <li>🔒 Authentification sécurisée</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Droite: Formulaire Login */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Connectez-vous</h2>
            <p className="text-slate-400">Accédez à votre espace DataIngest</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/10 border border-red-400/50 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mentora.com"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full mt-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">Utilisateurs de démonstration</span>
            </div>
          </div>

          {/* Demo Users Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TEST_USERS.map((testUser) => (
              <button
                key={testUser.email}
                onClick={() => handleDemoLogin(testUser)}
                disabled={isLoading}
                className={`p-3 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50 flex flex-col items-center gap-1 ${testUser.color}`}
              >
                <span className="text-xs opacity-90">{testUser.label}</span>
                <span className="text-xs">{testUser.email}</span>
              </button>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <p className="text-xs text-slate-300 text-center leading-relaxed mb-2">
              💡 Cliquez sur l'un des boutons de démonstration pour tester l'application.
            </p>
            <p className="text-xs text-amber-300 text-center leading-relaxed">
              ⚠️ En mode démo local (Supabase n'est pas configuré - c'est normal!)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
