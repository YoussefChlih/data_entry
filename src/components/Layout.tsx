import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useAppContext } from '../context/AppContext';
import { DataEntryForm } from '../pages/DataEntryForm';
import { DocumentList } from '../pages/DocumentList';
import { AdminDashboard } from '../pages/AdminDashboard';

export function Layout() {
  const { currentUser } = useAppContext();
  const [currentView, setCurrentView] = useState<string>('');

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setCurrentView('admin_dashboard');
    } else {
      setCurrentView('data_entry_new');
    }
  }, [currentUser]);

  const renderContent = () => {
    switch (currentView) {
      case 'data_entry_new':
        return <DataEntryForm onSave={() => setCurrentView('data_entry_list')} />;
      case 'data_entry_edit':
        return <DataEntryForm onSave={() => setCurrentView('data_entry_list')} />;
      case 'data_entry_list':
        return <DocumentList onEdit={() => setCurrentView('data_entry_edit')} />;
      case 'admin_dashboard':
        return <AdminDashboard />;
      case 'admin_documents':
        return <DocumentList onEdit={() => setCurrentView('data_entry_edit')} isAdmin />;
      default:
        return <div className="p-8 text-slate-500">Sélectionnez une option dans le menu.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
