import React, { useState } from 'react';
import { Upload, Plus, Trash2, Save, Eye, FileText, ChevronRight } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { CYCLES, NIVEAUX_SCOLAIRES, MATIERES_PAR_CYCLE, THEMES_PAR_MATIERE } from '../constants';
import { DocumentData, DocumentStructure, CourseTuple } from '../types';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { SummaryModal } from '../components/SummaryModal';

interface DataEntryFormProps {
  onSave: () => void;
  initialData?: DocumentData;
}

export function DataEntryForm({ onSave, initialData }: DataEntryFormProps) {
  const { currentUser, addDocument, updateDocument } = useAppContext();
  
  const [fileName, setFileName] = useState(initialData?.nom || '');
  const [cycle, setCycle] = useState(initialData?.cycle || '');
  const [niveau, setNiveau] = useState(initialData?.niveau || '');
  const [matiere, setMatiere] = useState(initialData?.matiere || '');
  const [structure, setStructure] = useState<DocumentStructure>(initialData?.structure || {});
  const [showPreview, setShowPreview] = useState(false);

  // Auto-generate unit names based on count
  const addUnit = () => {
    const unitCount = Object.keys(structure).length + 1;
    const newUnitName = `Unité ${unitCount}`;
    setStructure({ ...structure, [newUnitName]: {} });
  };

  const removeUnit = (unitName: string) => {
    const newStructure = { ...structure };
    delete newStructure[unitName];
    setStructure(newStructure);
  };

  const addSubSubject = (unitName: string, subSubject: string) => {
    if (!subSubject) return;
    setStructure(prev => ({
      ...prev,
      [unitName]: {
        ...prev[unitName],
        [subSubject]: prev[unitName][subSubject] || []
      }
    }));
  };

  const removeSubSubject = (unitName: string, subSubject: string) => {
    setStructure(prev => {
      const newUnit = { ...prev[unitName] };
      delete newUnit[subSubject];
      return { ...prev, [unitName]: newUnit };
    });
  };

  const addCourse = (unitName: string, subSubject: string) => {
    setStructure(prev => ({
      ...prev,
      [unitName]: {
        ...prev[unitName],
        [subSubject]: [...prev[unitName][subSubject], ['', 0, 0]]
      }
    }));
  };

  const updateCourse = (unitName: string, subSubject: string, index: number, field: 0 | 1 | 2, value: string | number) => {
    setStructure(prev => {
      const newCourses = [...prev[unitName][subSubject]];
      newCourses[index] = [...newCourses[index]] as CourseTuple;
      newCourses[index][field] = value as never;
      return {
        ...prev,
        [unitName]: {
          ...prev[unitName],
          [subSubject]: newCourses
        }
      };
    });
  };

  const removeCourse = (unitName: string, subSubject: string, index: number) => {
    setStructure(prev => {
      const newCourses = [...prev[unitName][subSubject]];
      newCourses.splice(index, 1);
      return {
        ...prev,
        [unitName]: {
          ...prev[unitName],
          [subSubject]: newCourses
        }
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const generateDocumentData = (): DocumentData => {
    return {
      id: initialData?.id || uuidv4(),
      nom: fileName,
      date_creation: initialData?.date_creation || new Date().toISOString().split('T')[0],
      utilisateur_id: currentUser?.id || '',
      niveau_id: `n_${uuidv4().substring(0, 4)}`, // Simple ID generation
      cycle,
      niveau,
      matiere,
      nombre_unites: Object.keys(structure).length,
      structure
    };
  };

  const handleSave = () => {
    const doc = generateDocumentData();
    if (initialData) {
      updateDocument(doc);
    } else {
      addDocument(doc);
    }
    onSave();
  };

  const availableNiveaux = cycle ? NIVEAUX_SCOLAIRES[cycle] || [] : [];
  const availableMatieres = cycle ? MATIERES_PAR_CYCLE[cycle] || [] : [];
  const availableThemes = matiere ? THEMES_PAR_MATIERE[matiere] || [] : [];

  return (
    <div className="max-w-5xl mx-auto p-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {initialData ? 'Modifier le document' : 'Nouvelle saisie de données'}
          </h1>
          <p className="text-slate-500 mt-1">Extrayez et structurez les données des documents PDF.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPreview(true)}
            disabled={!fileName || !niveau || !matiere || !cycle}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors disabled:opacity-50 font-medium"
          >
            <Eye size={18} />
            Vérifier les données
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Step 1: File Upload */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
            Source du document
          </h2>
          
          {!fileName ? (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload size={24} />
              </div>
              <p className="text-slate-700 font-medium">Cliquez ou glissez un PDF ici</p>
              <p className="text-slate-400 text-sm mt-1">Le nom du fichier sera extrait automatiquement</p>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-500 mb-1">Nom du document</label>
                <input 
                  type="text" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:ring-0"
                />
              </div>
              <button 
                onClick={() => setFileName('')}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer le fichier"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Metadata */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm">2</span>
            Informations générales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cycle d'enseignement</label>
              <select 
                value={cycle}
                onChange={(e) => {
                  setCycle(e.target.value);
                  setNiveau('');
                  setMatiere('');
                  setStructure({});
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="">Sélectionner le cycle...</option>
                {CYCLES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Niveau scolaire</label>
              <select 
                value={niveau}
                onChange={(e) => setNiveau(e.target.value)}
                disabled={!cycle}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
              >
                <option value="">Sélectionner le niveau...</option>
                {availableNiveaux.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Matière</label>
              <select 
                value={matiere}
                onChange={(e) => {
                  setMatiere(e.target.value);
                  setStructure({});
                }}
                disabled={!cycle}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
              >
                <option value="">Sélectionner la matière...</option>
                {availableMatieres.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Step 3: Structure Builder */}
        <div className={cn("transition-opacity duration-300", (!matiere || !niveau) ? "opacity-50 pointer-events-none" : "opacity-100")}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm">3</span>
              Structure du document
            </h2>
            <button 
              onClick={addUnit}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
            >
              <Plus size={16} />
              Ajouter une Unité
            </button>
          </div>

          <div className="space-y-6">
            {Object.entries(structure).map(([unitName, unitData], unitIndex) => (
              <div key={unitName} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                      {unitIndex + 1}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-lg">{unitName}</h3>
                  </div>
                  <button 
                    onClick={() => removeUnit(unitName)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer l'unité"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {Object.entries(unitData).map(([subSubject, courses]) => (
                    <div key={subSubject} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-slate-800 flex items-center gap-2">
                          <ChevronRight size={16} className="text-slate-400" />
                          {subSubject}
                        </h4>
                        <button 
                          onClick={() => removeSubSubject(unitName, subSubject)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Supprimer le thème"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="space-y-2 pl-6 border-l-2 border-slate-100">
                        {courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                            <input 
                              type="text" 
                              placeholder="Nom du cours"
                              value={course[0]}
                              onChange={(e) => updateCourse(unitName, subSubject, courseIndex, 0, e.target.value)}
                              className="flex-1 px-3 py-1.5 bg-transparent border-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm"
                            />
                            <div className="flex items-center gap-2 w-48">
                              <span className="text-xs text-slate-400 font-medium">P.</span>
                              <input 
                                type="number" 
                                placeholder="Début"
                                value={course[1] || ''}
                                onChange={(e) => updateCourse(unitName, subSubject, courseIndex, 1, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1.5 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-md text-sm text-center"
                              />
                              <span className="text-slate-300">-</span>
                              <input 
                                type="number" 
                                placeholder="Fin"
                                value={course[2] || ''}
                                onChange={(e) => updateCourse(unitName, subSubject, courseIndex, 2, parseInt(e.target.value) || 0)}
                                className="w-16 px-2 py-1.5 bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-md text-sm text-center"
                              />
                            </div>
                            <button 
                              onClick={() => removeCourse(unitName, subSubject, courseIndex)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="Supprimer le cours"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        
                        <button 
                          onClick={() => addCourse(unitName, subSubject)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mt-2"
                        >
                          <Plus size={14} />
                          Ajouter un cours
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-3">
                    <select 
                      className="flex-1 max-w-xs p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      onChange={(e) => {
                        addSubSubject(unitName, e.target.value);
                        e.target.value = ""; // reset
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>+ Ajouter un thème...</option>
                      {availableThemes
                        .filter(sub => !unitData[sub]) // don't show already added
                        .map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
            
            {Object.keys(structure).length === 0 && (
              <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <p className="text-slate-500 mb-4">Aucune unité ajoutée pour le moment.</p>
                <button 
                  onClick={addUnit}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors font-medium shadow-sm"
                >
                  <Plus size={18} />
                  Ajouter la première unité
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPreview && (
        <SummaryModal 
          data={generateDocumentData()} 
          onClose={() => setShowPreview(false)} 
          onConfirm={handleSave}
        />
      )}
    </div>
  );
}
