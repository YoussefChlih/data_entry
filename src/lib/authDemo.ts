/**
 * Authentication Mock/Demo Mode
 * Mode démo pour tester sans Supabase configuré
 * À utiliser UNIQUEMENT pour le développement local!
 */

import { AuthUser } from '../types';

/**
 * Utilisateurs de test en mode démo
 * Ces données sont en mémoire et non persistées
 */
const DEMO_USERS: Record<string, { email: string; password: string; name: string; role: 'admin' | 'data_entry'; username: string }> = {
  'admin@mentora.com': {
    email: 'admin@mentora.com',
    password: 'admin123',
    name: 'Fatima Admin',
    role: 'admin',
    username: 'admin',
  },
  'youssef@mentora.com': {
    email: 'youssef@mentora.com',
    password: 'user123',
    name: 'Youssef Data Entry',
    role: 'data_entry',
    username: 'youssef',
  },
  'amina@mentora.com': {
    email: 'amina@mentora.com',
    password: 'user123',
    name: 'Amina Data Entry',
    role: 'data_entry',
    username: 'amina',
  },
  'karim@mentora.com': {
    email: 'karim@mentora.com',
    password: 'user123',
    name: 'Karim Data Entry',
    role: 'data_entry',
    username: 'karim',
  },
  'salma@mentora.com': {
    email: 'salma@mentora.com',
    password: 'user123',
    name: 'Salma Data Entry',
    role: 'data_entry',
    username: 'salma',
  },
};

/**
 * Mode démo: Login sans Supabase
 * Utilise juste les credentials en dur
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns { user: AuthUser | null, token: string | null, error: string | null }
 */
export async function loginUserDemo(email: string, password: string) {
  // Simule un délai pour ressembler à une requête réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = DEMO_USERS[email];

  if (!user) {
    return {
      user: null,
      token: null,
      error: 'Email incorrect ou utilisateur non trouvé',
    };
  }

  if (user.password !== password) {
    return {
      user: null,
      token: null,
      error: 'Mot de passe incorrect',
    };
  }

  // Crée l'utilisateur
  const authUser: AuthUser = {
    id: `user_${Math.random().toString(36).substr(2, 9)}`,
    email: user.email,
    username: user.username,
    name: user.name,
    role: user.role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
  };

  // Génère un token JWT simple
  const tokenPayload = {
    userId: authUser.id,
    email: authUser.email,
    role: authUser.role,
    iat: Math.floor(Date.now() / 1000),
  };
  const token = btoa(JSON.stringify(tokenPayload));

  return {
    user: authUser,
    token,
    error: null,
  };
}

/**
 * Obtient les utilisateurs de test disponibles
 * Utile pour afficher les options de démo
 */
export function getDemoUsers() {
  return Object.values(DEMO_USERS);
}
