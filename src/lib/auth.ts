/**
 * Authentication Logic
 * Gère le login, logout et la vérification des credentials
 */

import { supabase, SUPABASE_CONFIGURED } from './supabase';
import { AuthUser } from '../types';

/**
 * Connecte un utilisateur avec email et mot de passe
 * Cherche l'utilisateur dans Supabase et valide le mot de passe
 * 
 * ⚠️ AUTOMATIQUEMENT FORCE LE MODE DÉMO SI SUPABASE N'EST PAS CONFIGURÉ
 *
 * @param email - Email de l'utilisateur
 * @param password - Mot de passe de l'utilisateur
 * @returns { user: AuthUser | null, token: string | null, error: string | null }
 */
export async function loginUser(email: string, password: string) {
  // Si Supabase n'est pas configuré, force le mode démo
  if (!SUPABASE_CONFIGURED) {
    return {
      user: null,
      token: null,
      error: 'supabase_not_configured', // Signal spécial pour utiliser le mode démo
    };
  }

  try {
    // 1. Cherche l'utilisateur dans la table "users" par email
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('id, email, username, role, name, avatar')
      .eq('email', email)
      .single();

    if (fetchError || !userData) {
      return {
        user: null,
        token: null,
        error: 'Email incorrect ou utilisateur non trouvé',
      };
    }

    // 2. Appelle la RPC Supabase "verify_password" pour vérifier le mot de passe
    const { data: passwordValid, error: verifyError } = await supabase.rpc('verify_password', {
      p_email: email,
      p_password: password,
    });

    if (verifyError || !passwordValid) {
      return {
        user: null,
        token: null,
        error: 'Mot de passe incorrect',
      };
    }

    // 3. Crée un objet User au bon format
    const authUser: AuthUser = {
      id: String(userData.id),
      email: userData.email,
      username: userData.username,
      name: userData.name || userData.username,
      role: userData.role as 'admin' | 'data_entry',
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
    };

    // 4. Génère un token JWT simple (base64 encoded)
    const tokenPayload = {
      userId: authUser.id,
      email: authUser.email,
      role: authUser.role,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = btoa(JSON.stringify(tokenPayload));

    // 5. Retourne l'utilisateur et le token
    return {
      user: authUser,
      token,
      error: null,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      user: null,
      token: null,
      error: 'Erreur lors de la connexion. Vérifiez vos identifiants.',
    };
  }
}

/**
 * Déconnecte l'utilisateur (stockage local uniquement)
 * Puisque nous utilisons localStorage, il suffit de le vider
 */
export function logoutUser() {
  localStorage.removeItem('auth_user');
  localStorage.removeItem('auth_token');
}

/**
 * Récupère l'utilisateur actuellement connecté depuis localStorage
 * @returns { user: AuthUser | null, token: string | null }
 */
export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('auth_user');
    const token = localStorage.getItem('auth_token');

    if (!userStr || !token) {
      return { user: null, token: null };
    }

    const user = JSON.parse(userStr) as AuthUser;
    return { user, token };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null, token: null };
  }
}

/**
 * Sauvegarde l'utilisateur et le token dans localStorage
 * @param user - L'utilisateur à sauvegarder
 * @param token - Le token JWT
 */
export function saveUserSession(user: AuthUser, token: string) {
  localStorage.setItem('auth_user', JSON.stringify(user));
  localStorage.setItem('auth_token', token);
}

/**
 * Teste la connexion Supabase
 * @returns { connected: boolean, message: string }
 */
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error) throw error;
    return {
      connected: true,
      message: 'Supabase connexion OK',
    };
  } catch (error) {
    console.error('Supabase connection error:', error);
    return {
      connected: false,
      message: 'Erreur de connexion à Supabase',
    };
  }
}
