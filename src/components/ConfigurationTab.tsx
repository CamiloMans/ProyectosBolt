import React from 'react';
import { SelectField } from './SelectField';
import { locales, secciones } from '../data/options';
import { Configuration } from '../types';
import { Building, Users, UserCheck } from 'lucide-react';

interface ConfigurationTabProps {
  config: Configuration;
  setConfig: React.Dispatch<React.SetStateAction<Configuration>>;
}

export const ConfigurationTab: React.FC<ConfigurationTabProps> = ({ config, setConfig }) => {
  const updateConfig = (key: keyof Configuration, value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Building className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Configuración General</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SelectField
            label="Local"
            value={config.local}
            onChange={(value) => updateConfig('local', value)}
            options={locales}
            placeholder="Seleccionar local"
          />
          
          <SelectField
            label="Sección"
            value={config.seccion}
            onChange={(value) => updateConfig('seccion', value)}
            options={secciones}
            placeholder="Seleccionar sección"
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Colaborador
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => updateConfig('tipoColaborador', 'interno')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  config.tipoColaborador === 'interno'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users size={18} />
                <span>Interno</span>
              </button>
              <button
                onClick={() => updateConfig('tipoColaborador', 'externo')}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
                  config.tipoColaborador === 'externo'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <UserCheck size={18} />
                <span>Externo</span>
              </button>
            </div>
          </div>
        </div>

        {(config.local || config.seccion || config.tipoColaborador) && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-sm font-medium text-green-800 mb-2">Configuración Actual:</h3>
            <div className="text-sm text-green-700 space-y-1">
              {config.local && <p><strong>Local:</strong> {config.local}</p>}
              {config.seccion && <p><strong>Sección:</strong> {config.seccion}</p>}
              {config.tipoColaborador && <p><strong>Colaborador:</strong> {config.tipoColaborador === 'interno' ? 'Interno' : 'Externo'}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};