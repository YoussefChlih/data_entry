import React from 'react';
import { X, Check, FileText, BookOpen, Layers, Calendar } from 'lucide-react';
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
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
          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <FileText size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-slate-900">{data.nom}</h4>
                  <p className="text-slate-600 mt-1 text-sm">Document créé le {formatDate(data.date_creation)}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase mb-1">Cycle</p>
                  <p className="font-semibold text-slate-800">{data.cycle}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase mb-1">Niveau</p>
                  <p className="font-semibold text-slate-800">{data.niveau}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase mb-1">Matière</p>
                  <p className="font-semibold text-slate-800">{data.matiere}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase mb-1">Structure</p>
                  <p className="font-semibold text-slate-800">{data.nombre_unites}U • {totalCourses}C</p>
                </div>
              </div>
            </div>

            {/* Content Structure Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h5 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Layers size={18} className="text-blue-600" />
                Contenu détaillé
              </h5>
              
              <div className="space-y-4">
                {Object.entries(data.structure).map(([unitName, unitData], unitIndex) => (
                  <div key={unitName} className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    {/* Unit Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-50/50 px-4 py-3 border-b border-slate-200 flex items-center gap-3">
                      <div className="w-7 h-7 bg-white rounded-md border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700">
                        {unitIndex + 1}
                      </div>
                      <h6 className="font-semibold text-slate-800">{unitName}</h6>
                    </div>

                    {/* Themes and Courses */}
                    <div className="p-4 space-y-4">
                      {Object.entries(unitData).map(([theme, courses], themeIndex) => (
                        <div key={`${unitName}-${theme}-${themeIndex}`} className="border border-slate-200 rounded-lg p-3 bg-white">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">Thème</span>
                            <h7 className="font-medium text-slate-800">{theme}</h7>
                          </div>

                          {/* Courses List */}
                          <div className="space-y-2 pl-0">
                            {courses.map((course, courseIndex) => (
                              <div key={courseIndex} className="flex items-center gap-3 p-2 bg-slate-50 rounded border border-slate-100">
                                <span className="text-xs font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded w-5 text-center">
                                  {courseIndex + 1}
                                </span>
                                <span className="text-sm font-medium text-slate-700 flex-1">{course[0] || '(sans titre)'}</span>
                                {(course[1] > 0 || course[2] > 0) && (
                                  <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded font-mono border border-slate-200">
                                    p. {course[1]}-{course[2]}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
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
