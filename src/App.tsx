/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';

/**
 * Composant interne qui utilise useAppContext
 * (doit être à l'intérieur du AppProvider)
 */
function AppContent() {
  const { isAuthenticated } = useAppContext();

  // Si l'utilisateur n'est pas authentifié, affiche la page de login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Sinon, affiche l'application principale
  return <Layout />;
}

/**
 * Composant principal de l'application
 */
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

