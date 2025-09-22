export interface Task {
  id: string;
  local: string;
  seccion: string;
  tipoColaborador: 'interno' | 'externo';
  ubicacion: string;
  categoria: string;
  tarea: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // en segundos
}

export interface ActiveTask {
  id: string;
  local: string;
  seccion: string;
  tipoColaborador: 'interno' | 'externo';
  ubicacion: string;
  categoria: string;
  tarea: string;
  startTime: Date;
}

export interface Configuration {
  local: string;
  seccion: string;
  tipoColaborador: 'interno' | 'externo';
}

export interface TaskSelection {
  ubicacion: string;
  categoria: string;
  tarea: string;
}