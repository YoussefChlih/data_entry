/// <reference types="vite/client" />

/**
 * Supabase Client Configuration
 * Gère la connexion à Supabase et les opérations d'upload/download
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Vérifie si les credentials Supabase sont valides
 * (pas vides, pas des placeholders)
 */
function isSupabaseConfigured(): boolean {
  // Vérifie que la URL n'est pas vide et ne contient pas le placeholder
  const isUrlValid = SUPABASE_URL && 
    !SUPABASE_URL.includes('your-project-id') && 
    SUPABASE_URL.startsWith('https://') &&
    SUPABASE_URL.includes('supabase.co');
  
  // Vérifie que la clé n'est pas vide et ne contient pas le placeholder
  const isKeyValid = SUPABASE_ANON_KEY && 
    !SUPABASE_ANON_KEY.includes('your_actual_key_here') &&
    SUPABASE_ANON_KEY.startsWith('eyJ');
  
  return isUrlValid && isKeyValid;
}

/**
 * Flag pour savoir si Supabase est correctement configuré
 * Sera utilisé par les composants pour fallback au mode démo si nécessaire
 */
export const SUPABASE_CONFIGURED = isSupabaseConfigured();

if (!SUPABASE_CONFIGURED) {
  console.warn('⚠️ Supabase pas configuré correctement');
  console.warn('📝 Pour configurer Supabase:');
  console.warn('   1. Ouvrez .env.local');
  console.warn('   2. Remplissez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY');
  console.warn('   3. Consultez SUPABASE_SETUP.md pour les instructions');
  console.warn('💡 Mode démo local sera utilisé automatiquement');
}

export const supabase = createClient(SUPABASE_URL || 'https://dummy.supabase.co', SUPABASE_ANON_KEY || 'dummy-key');

/**
 * Upload un fichier PDF au bucket 'documents/pdfs/'
 * @param file - Le fichier PDF à uploader
 * @param documentId - ID du document pour nommer le fichier
 * @returns { path: string | null, error: string | null }
 */
export async function uploadPDF(file: File, documentId: string) {
  try {
    const fileName = `${documentId}_${Date.now()}.pdf`;
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(`pdfs/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from('documents')
      .getPublicUrl(`pdfs/${fileName}`);

    return { path: data?.path || null, url: publicUrl?.publicUrl || null, error: null };
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return { path: null, url: null, error: String(error) };
  }
}

/**
 * Upload un fichier JSON au bucket 'documents/json/'
 * @param data - Les données à sauvegarder en JSON
 * @param documentId - ID du document pour nommer le fichier
 * @returns { path: string | null, error: string | null }
 */
export async function uploadJSON(data: any, documentId: string) {
  try {
    const fileName = `${documentId}_${Date.now()}.json`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const file = new File([blob], fileName, { type: 'application/json' });

    const { data: uploadData, error } = await supabase.storage
      .from('documents')
      .upload(`json/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from('documents')
      .getPublicUrl(`json/${fileName}`);

    return { path: uploadData?.path || null, url: publicUrl?.publicUrl || null, error: null };
  } catch (error) {
    console.error('Error uploading JSON:', error);
    return { path: null, url: null, error: String(error) };
  }
}

/**
 * Supprime tous les fichiers associés à un document
 * @param documentId - ID du document
 * @returns { error: string | null }
 */
export async function deleteDocumentFiles(documentId: string) {
  try {
    // Récupère tous les fichiers du document
    const { data: pdfFiles } = await supabase.storage
      .from('documents')
      .list(`pdfs/`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    const { data: jsonFiles } = await supabase.storage
      .from('documents')
      .list(`json/`, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    // Filtre et supprime les fichiers du document
    const filesToDelete: string[] = [];

    if (pdfFiles) {
      pdfFiles
        .filter((file) => file.name.startsWith(documentId))
        .forEach((file) => filesToDelete.push(`pdfs/${file.name}`));
    }

    if (jsonFiles) {
      jsonFiles
        .filter((file) => file.name.startsWith(documentId))
        .forEach((file) => filesToDelete.push(`json/${file.name}`));
    }

    if (filesToDelete.length > 0) {
      const { error } = await supabase.storage.from('documents').remove(filesToDelete);
      if (error) throw error;
    }

    return { error: null };
  } catch (error) {
    console.error('Error deleting document files:', error);
    return { error: String(error) };
  }
}
