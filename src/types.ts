export type CourseTuple = [string, number, number]; // [Name, StartPage, EndPage]

export type UnitStructure = {
  [subSubject: string]: CourseTuple[];
};

export type DocumentStructure = {
  [unitName: string]: UnitStructure;
};

export interface DocumentData {
  id: string;
  nom: string;
  date_creation: string;
  utilisateur_id: string;
  niveau_id: string;
  cycle: string;
  niveau: string;
  matiere: string;
  nombre_unites: number;
  structure: DocumentStructure;
}

export interface User {
  id: string;
  name: string;
  role: 'data_entry' | 'admin';
  avatar?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'data_entry' | 'admin';
  avatar: string;
}

export interface AppState {
  currentUser: User | null;
  documents: DocumentData[];
  users: User[];
  isAuthenticated: boolean;
  authToken: string | null;
}
