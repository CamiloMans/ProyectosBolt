import React from 'react';
import { SelectField } from './SelectField';
import { ubicaciones, categorias, tareas } from '../data/options';
import { TaskSelection, ActiveTask, Task } from '../types';
import { MapPin, Tag, Clock, Play, Square, CheckCircle } from 'lucide-react';
import { formatTime, formatDuration } from '../utils/timeFormatters';

interface MeasurementTabProps {
  taskSelection: TaskSelection;
  setTaskSelection: React.Dispatch<React.SetStateAction<TaskSelection>>;
  activeTask: ActiveTask | null;
  completedTasks: Task[];
  totalTime: number;
  currentTime: number;
  isRunning: boolean;
  onStartTask: () => void;
  onStopTask: () => void;
}

export const MeasurementTab: React.FC<MeasurementTabProps> = ({
  taskSelection,
  setTaskSelection,
  activeTask,
  completedTasks,
  totalTime,
  currentTime,
  isRunning,
  onStartTask,
  onStopTask
}) => {
  const updateSelection = (key: keyof TaskSelection, value: string) => {
    setTaskSelection(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const canStartTask = taskSelection.ubicacion && taskSelection.categoria && taskSelection.tarea;

  return (
    <div className="space-y-8">
      {/* Selección de Tarea */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Selección de Tarea</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectField
            label="Ubicación"
            value={taskSelection.ubicacion}
            onChange={(value) => updateSelection('ubicacion', value)}
            options={ubicaciones}
            placeholder="Seleccionar ubicación"
          />
          
          <SelectField
            label="Categoría"
            value={taskSelection.categoria}
            onChange={(value) => updateSelection('categoria', value)}
            options={categorias}
            placeholder="Seleccionar categoría"
          />
          
          <SelectField
            label="Tarea"
            value={taskSelection.tarea}
            onChange={(value) => updateSelection('tarea', value)}
            options={tareas}
            placeholder="Seleccionar tarea"
          />
        </div>
      </div>

      {/* Cronómetro Activo */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Cronómetro</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            {canStartTask && (
              <button
                onClick={isRunning ? onStopTask : onStartTask}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isRunning
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isRunning ? <Square size={18} /> : <Play size={18} />}
                <span>{isRunning ? 'Detener' : 'Iniciar'}</span>
              </button>
            )}
          </div>
        </div>

        {activeTask ? (
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Tarea Activa</h3>
              <div className="text-3xl font-bold text-blue-900">
                {formatTime(currentTime)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Ubicación:</span>
                <p className="text-blue-900">{activeTask.ubicacion}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Categoría:</span>
                <p className="text-blue-900">{activeTask.categoria}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Tarea:</span>
                <p className="text-blue-900">{activeTask.tarea}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No hay tarea activa</p>
            <p className="text-sm">Selecciona una tarea y presiona "Iniciar" para comenzar</p>
          </div>
        )}
      </div>

      {/* Resumen y Tiempo Total */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tiempo Total */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Tiempo Total</h3>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatTime(totalTime + currentTime)}
            </div>
            <p className="text-gray-600">Tiempo acumulado de todas las tareas</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <Tag className="text-purple-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-900">Estadísticas</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tareas Completadas:</span>
              <span className="font-semibold text-gray-900">{completedTasks.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tiempo Promedio:</span>
              <span className="font-semibold text-gray-900">
                {completedTasks.length > 0 
                  ? formatDuration(Math.floor(totalTime / completedTasks.length))
                  : '0s'
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Estado:</span>
              <span className={`font-semibold ${isRunning ? 'text-green-600' : 'text-gray-500'}`}>
                {isRunning ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Historial de Tareas */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Tareas</h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{task.tarea}</div>
                  <div className="text-sm text-gray-500">
                    {task.ubicacion} • {task.categoria}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatDuration(task.duration)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {task.startTime.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};