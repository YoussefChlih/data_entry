import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, DocumentData, User, AuthUser } from '../types';
import { getCurrentUser, saveUserSession } from '../lib/auth';

interface AppContextType extends AppState {
  setCurrentUser: (user: User) => void;
  logout: () => void;
  addDocument: (doc: DocumentData) => void;
  updateDocument: (doc: DocumentData) => void;
  deleteDocument: (id: string) => void;
}

const MOCK_USERS: User[] = [
  { id: 'user_042', name: 'Ahmed Data Entry', role: 'data_entry', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed' },
  { id: 'admin_001', name: 'Fatima Admin', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [users] = useState<User[]>(MOCK_USERS);

  // Charge l'utilisateur depuis localStorage au mount
  useEffect(() => {
    const { user, token } = getCurrentUser();
    if (user && token) {
      // Convertit AuthUser en User
      const mappedUser: User = {
        id: user.id,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      };
      setCurrentUserState(mappedUser);
      setIsAuthenticated(true);
      setAuthToken(token);
    }
  }, []);

  // Charge les documents depuis localStorage au mount
  useEffect(() => {
    const savedDocs = localStorage.getItem('app_documents');
    if (savedDocs) {
      try {
        setDocuments(JSON.parse(savedDocs));
      } catch (e) {
        console.error('Failed to parse documents', e);
      }
    }
  }, []);

  // Sauvegarde les documents dans localStorage quand ils changent
  useEffect(() => {
    localStorage.setItem('app_documents', JSON.stringify(documents));
  }, [documents]);

  // Setter pour l'utilisateur avec sauvegarde
  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
    setIsAuthenticated(true);

    // Sauvegarde l'utilisateur en tant qu'AuthUser pour localStorage
    const authUser: AuthUser = {
      id: user.id,
      email: user.name.toLowerCase().replace(' ', '@example.com'),
      username: user.name.toLowerCase().replace(' ', '_'),
      name: user.name,
      role: user.role,
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
    };

    // Token est défini ailleurs (dans auth.ts)
    // Mais on peut aussi le générer ici si besoin
    const token = btoa(JSON.stringify({
      userId: user.id,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    }));

    saveUserSession(authUser, token);
    setAuthToken(token);
  };

  // Logout
  const logout = () => {
    setCurrentUserState(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    setDocuments([]);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('app_documents');
  };

  // Document management
  const addDocument = (doc: DocumentData) => {
    setDocuments((prev) => [...prev, doc]);
  };

  const updateDocument = (doc: DocumentData) => {
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? doc : d)));
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        documents,
        users,
        isAuthenticated,
        authToken,
        setCurrentUser,
        logout,
        addDocument,
        updateDocument,
        deleteDocument,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
