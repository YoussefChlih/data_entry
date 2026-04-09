import React from 'react';
import { Users, FileText, Activity, TrendingUp, BookOpen, Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function AdminDashboard() {
  const { documents, users } = useAppContext();

  const dataEntryUsers = users.filter(u => u.role === 'data_entry');
  
  const docsToday = documents.filter(d => d.date_creation === new Date().toISOString().split('T')[0]).length;
  const avgUnits = documents.length ? (documents.reduce((acc, doc) => acc + doc.nombre_unites, 0) / documents.length).toFixed(1) : 0;

  // Documents par cycle
  const docsByCycle = documents.reduce((acc, doc) => {
    acc[doc.cycle] = (acc[doc.cycle] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    { label: 'Total Documents', value: documents.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Saisies Aujourd\'hui', value: docsToday, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Utilisateurs Actifs', value: dataEntryUsers.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Moy. Unités/Doc', value: avgUnits, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  // Calculate progress per user
  const userProgress = dataEntryUsers.map(user => {
    const userDocs = documents.filter(d => d.utilisateur_id === user.id);
    return {
      ...user,
      docCount: userDocs.length,
      lastActive: userDocs.length > 0 
        ? [...userDocs].sort((a, b) => new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime())[0].date_creation
        : 'Jamais'
    };
  }).sort((a, b) => b.docCount - a.docCount);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord Administrateur</h1>
        <p className="text-slate-500 mt-1">Aperçu de la progression des saisies et des métriques du système.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Progression des utilisateurs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Documents traités</th>
                  <th className="px-6 py-4">Dernière activité</th>
                  <th className="px-6 py-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userProgress.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full bg-slate-100" />
                        <div>
                          <p className="font-medium text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{user.docCount}</span>
                        <span className="text-slate-400 text-xs">fichiers</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.lastActive}</td>
                    <td className="px-6 py-4">
                      {user.docCount > 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Actif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Inactif
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800">Répartition par Cycle</h2>
          </div>
          <div className="p-6 space-y-4">
            {['Primaire', 'Collège', 'Lycée'].map(cycle => (
              <div key={cycle} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center text-blue-600">
                    <BookOpen size={20} />
                  </div>
                  <span className="font-medium text-slate-700">{cycle}</span>
                </div>
                <span className="text-lg font-bold text-slate-900">{docsByCycle[cycle] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
