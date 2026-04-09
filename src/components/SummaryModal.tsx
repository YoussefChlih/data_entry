import React from 'react';
import { X, Check, FileText, BookOpen, Layers } from 'lucide-react';
import { DocumentData } from '../types';

interface SummaryModalProps {
  data: DocumentData;
  onClose: () => void;
  onConfirm: () => void;
}

export function SummaryModal({ data, onClose, onConfirm }: SummaryModalProps) {
  let totalCourses = 0;
  Object.values(data.structure).forEach(unit => {
    Object.values(unit).forEach(courses => {
      totalCourses += courses.length;
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">Vérification avant validation</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6 bg-slate-50">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">{data.nom}</h4>
                <p className="text-slate-500 mt-1 flex items-center gap-2">
                  <span className="font-medium text-slate-700">{data.cycle}</span>
                  •
                  <span>{data.niveau}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <BookOpen size={16} />
                  <span className="text-sm font-medium">Matière</span>
                </div>
                <p className="font-semibold text-slate-800">{data.matiere}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Layers size={16} />
                  <span className="text-sm font-medium">Structure</span>
                </div>
                <p className="font-semibold text-slate-800">
                  {data.nombre_unites} Unité{data.nombre_unites > 1 ? 's' : ''}, {totalCourses} Cours
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-slate-800 mb-3">Aperçu du contenu :</h5>
              <div className="space-y-3">
                {Object.entries(data.structure).map(([unitName, unitData]) => (
                  <div key={unitName} className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                    <p className="font-semibold text-slate-700 mb-2">{unitName}</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(unitData).map(theme => (
                        <span key={theme} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-slate-600">
                          {theme} ({unitData[theme].length} cours)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
          >
            Modifier
          </button>
          <button 
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm shadow-blue-600/20"
          >
            <Check size={18} />
            Valider et Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
