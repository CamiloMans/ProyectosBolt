import React, { useState, useEffect } from 'react';
import { Settings, BarChart3 } from 'lucide-react';
import { TabButton } from './components/TabButton';
import { ConfigurationTab } from './components/ConfigurationTab';
import { MeasurementTab } from './components/MeasurementTab';
import { useTimer } from './hooks/useTimer';
import { Configuration, TaskSelection, ActiveTask, Task } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'config' | 'measurement'>('config');
  const [config, setConfig] = useState<Configuration>({
    local: '',
    seccion: '',
    tipoColaborador: 'interno'
  });
  const [taskSelection, setTaskSelection] = useState<TaskSelection>({
    ubicacion: '',
    categoria: '',
    tarea: ''
  });
  const [activeTask, setActiveTask] = useState<ActiveTask | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  
  const { seconds, isRunning, start, stop, reset } = useTimer();

  const handleStartTask = () => {
    // Si hay una tarea activa, la completamos primero
    if (activeTask) {
      handleStopTask();
    }

    // Iniciamos la nueva tarea
    const newTask: ActiveTask = {
      id: Date.now().toString(),
      ...config,
      ...taskSelection,
      startTime: new Date()
    };
    
    setActiveTask(newTask);
    reset();
    start();
  };

  const handleStopTask = () => {
    if (activeTask) {
      const completedTask: Task = {
        ...activeTask,
        endTime: new Date(),
        duration: seconds
      };
      
      setCompletedTasks(prev => [...prev, completedTask]);
      setTotalTime(prev => prev + seconds);
      setActiveTask(null);
      stop();
      reset();
    }
  };

  // Validar si se puede cambiar a la pestaña de medición
  const canAccessMeasurement = config.local && config.seccion && config.tipoColaborador;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Mediciones Operativas
          </h1>
          <p className="text-gray-600">
            Monitoreo y control de tiempos de tareas operativas
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-gray-100 p-2 rounded-xl">
            <TabButton
              active={activeTab === 'config'}
              onClick={() => setActiveTab('config')}
              icon={<Settings size={20} />}
            >
              Configuración
            </TabButton>
            <TabButton
              active={activeTab === 'measurement'}
              onClick={() => {
                if (canAccessMeasurement) {
                  setActiveTab('measurement');
                }
              }}
              icon={<BarChart3 size={20} />}
            >
              Medición
              {!canAccessMeasurement && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  Bloqueado
                </span>
              )}
            </TabButton>
          </div>
        </div>

        {/* Alert for incomplete configuration */}
        {activeTab === 'measurement' && !canAccessMeasurement && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-yellow-800">
                <strong>Configuración incompleta:</strong> Completa todos los campos en la pestaña de configuración para acceder a las mediciones.
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'config' && (
            <ConfigurationTab 
              config={config} 
              setConfig={setConfig} 
            />
          )}
          {activeTab === 'measurement' && canAccessMeasurement && (
            <MeasurementTab
              taskSelection={taskSelection}
              setTaskSelection={setTaskSelection}
              activeTask={activeTask}
              completedTasks={completedTasks}
              totalTime={totalTime}
              currentTime={seconds}
              isRunning={isRunning}
              onStartTask={handleStartTask}
              onStopTask={handleStopTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;