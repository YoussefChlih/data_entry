import React from 'react';
import { LayoutDashboard, FileText, PlusCircle, Shield, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const { currentUser, users, setCurrentUser, logout } = useAppContext();

  const toggleRole = () => {
    const nextUser = users.find(u => u.id !== currentUser?.id);
    if (nextUser) setCurrentUser(nextUser);
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      logout();
    }
  };

  const navItems = currentUser?.role === 'admin' 
    ? [
        { id: 'admin_dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { id: 'admin_documents', label: 'Tous les documents', icon: FileText },
      ]
    : [
        { id: 'data_entry_new', label: 'Nouvelle saisie', icon: PlusCircle },
        { id: 'data_entry_list', label: 'Mes documents', icon: FileText },
      ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-3 text-white font-semibold text-xl tracking-tight">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          DataIngest
        </div>
      </div>

      <div className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                isActive 
                  ? "bg-blue-600/10 text-blue-400" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={currentUser?.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-700" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-slate-400 capitalize flex items-center gap-1">
                {currentUser?.role === 'admin' && <Shield size={12} className="text-amber-400" />}
                {currentUser?.role === 'admin' ? 'Administrateur' : 'Saisie de données'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors border border-red-600/30"
          >
            <LogOut size={14} />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
