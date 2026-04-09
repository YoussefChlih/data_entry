import React from 'react';
import { FileText, Edit2, Trash2, Download, Search, PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { DocumentData } from '../types';

interface DocumentListProps {
  onEdit: (doc: DocumentData) => void;
  isAdmin?: boolean;
}

export function DocumentList({ onEdit, isAdmin }: DocumentListProps) {
  const { documents, currentUser, deleteDocument } = useAppContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  const displayDocs = isAdmin 
    ? documents 
    : documents.filter(d => d.utilisateur_id === currentUser?.id);

  const filteredDocs = displayDocs.filter(d => 
    d.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.niveau.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (doc: DocumentData) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ document: doc }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", doc.nom + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isAdmin ? 'Tous les documents' : 'Mes documents'}
          </h1>
          <p className="text-slate-500 mt-1">
            {isAdmin ? 'Gérez toutes les saisies de la plateforme.' : 'Gérez vos récentes saisies de données.'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher par nom, matière ou niveau..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Nom du document</th>
                <th className="px-6 py-4">Cycle & Niveau</th>
                <th className="px-6 py-4">Matière</th>
                <th className="px-6 py-4">Unités</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FileText size={32} className="text-slate-300" />
                      <p>Aucun document trouvé.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      {doc.nom}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-800 font-medium">{doc.cycle}</span>
                        <span className="text-slate-500 text-xs">{doc.niveau}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.matiere}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.nombre_unites}</td>
                    <td className="px-6 py-4 text-slate-500">{doc.date_creation}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDownload(doc)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Télécharger JSON"
                        >
                          <Download size={18} />
                        </button>
                        <button 
                          onClick={() => onEdit(doc)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
                              deleteDocument(doc.id);
                            }
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
