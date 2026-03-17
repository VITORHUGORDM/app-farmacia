import React, { createContext, ReactNode, useContext, useState } from "react";
import { TextInputProps } from "react-native";
import { useNotification } from "../_components/NotificationContext";

export interface HeaderProps {
  title?: string;
  image?: string;
  logoImage?: string;
}

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export interface MenuProps {
  onDashboardPress?: () => void;
  onFarmaceuticosPress?: () => void;
  onPacientesPress?: () => void;
  onMedicamentosPress?: () => void;
  onTratamentosPress?: () => void;
}

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export interface HeaderProps {
  title?: string;
  image?: string;
  logoImage?: string;
}

export interface Farmaceutico {
  id: string;
  nome: string;
  especialidade: string;
  telefone: string;
  email: string;
}

export interface Medicamento {
  id: string;
  nome: string;
  tipo: string;
  quantidade: string;
  dosagem: string;
  descricao: string;
}

export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  endereco: string;
}

export interface Tratamento {
  id: string;
  paciente: string;
  medicamento: string;
  farmaceutico: string;
  dataInicio: string;
  dataTermino: string;
  posologia: string;
  periodo: string;
  observacoes: string;
}

type AppContextType = {
  farmaceuticos: Farmaceutico[];
  addFarmaceutico: (item: Omit<Farmaceutico, "id">) => void;
  updateFarmaceutico: (id: string, item: Omit<Farmaceutico, "id">) => void;
  deleteFarmaceutico: (id: string) => void;
  medicamentos: Medicamento[];
  addMedicamento: (item: Omit<Medicamento, "id">) => void;
  updateMedicamento: (id: string, item: Omit<Medicamento, "id">) => void;
  deleteMedicamento: (id: string) => void;
  pacientes: Paciente[];
  addPaciente: (item: Omit<Paciente, "id">) => void;
  updatePaciente: (id: string, item: Omit<Paciente, "id">) => void;
  deletePaciente: (id: string) => void;
  tratamentos: Tratamento[];
  addTratamento: (item: Omit<Tratamento, "id">) => void;
  updateTratamento: (id: string, item: Omit<Tratamento, "id">) => void;
  deleteTratamento: (id: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { showNotification } = useNotification();

  const [farmaceuticos, setFarmaceuticos] = useState<Farmaceutico[]>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addFarmaceutico = (item: Omit<Farmaceutico, "id">) => {
    setFarmaceuticos((prev) => [...prev, { ...item, id: generateId() }]);
    showNotification("success", "Farmacêutico cadastrado com sucesso");
  };

  const updateFarmaceutico = (id: string, item: Omit<Farmaceutico, "id">) => {
    setFarmaceuticos((prev) =>
      prev.map((f) => (f.id === id ? { ...item, id } : f)),
    );
    showNotification("success", "Farmacêutico editado com sucesso");
  };

  const deleteFarmaceutico = (id: string) => {
    setFarmaceuticos((prev) => prev.filter((f) => f.id !== id));
    showNotification("success", "Farmacêutico excluído com sucesso");
  };

  const addMedicamento = (item: Omit<Medicamento, "id">) => {
    setMedicamentos((prev) => [...prev, { ...item, id: generateId() }]);
    showNotification("success", "Medicamento cadastrado com sucesso");
  };

  const updateMedicamento = (id: string, item: Omit<Medicamento, "id">) => {
    setMedicamentos((prev) =>
      prev.map((m) => (m.id === id ? { ...item, id } : m)),
    );
    showNotification("success", "Medicamento editado com sucesso");
  };

  const deleteMedicamento = (id: string) => {
    setMedicamentos((prev) => prev.filter((m) => m.id !== id));
    showNotification("success", "Medicamento excluído com sucesso");
  };

  const addPaciente = (item: Omit<Paciente, "id">) => {
    setPacientes((prev) => [...prev, { ...item, id: generateId() }]);
    showNotification("success", "Paciente cadastrado com sucesso");
  };

  const updatePaciente = (id: string, item: Omit<Paciente, "id">) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === id ? { ...item, id } : p)),
    );
    showNotification("success", "Paciente editado com sucesso");
  };

  const deletePaciente = (id: string) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
    showNotification("success", "Paciente excluído com sucesso");
  };

  const addTratamento = (item: Omit<Tratamento, "id">) => {
    setTratamentos((prev) => [...prev, { ...item, id: generateId() }]);
    showNotification("success", "Tratamento cadastrado com sucesso");
  };

  const updateTratamento = (id: string, item: Omit<Tratamento, "id">) => {
    setTratamentos((prev) =>
      prev.map((t) => (t.id === id ? { ...item, id } : t)),
    );
    showNotification("success", "Tratamento editado com sucesso");
  };

  const deleteTratamento = (id: string) => {
    setTratamentos((prev) => prev.filter((t) => t.id !== id));
    showNotification("success", "Tratamento excluído com sucesso");
  };

  const value: AppContextType = {
    farmaceuticos,
    addFarmaceutico,
    updateFarmaceutico,
    deleteFarmaceutico,
    medicamentos,
    addMedicamento,
    updateMedicamento,
    deleteMedicamento,
    pacientes,
    addPaciente,
    updatePaciente,
    deletePaciente,
    tratamentos,
    addTratamento,
    updateTratamento,
    deleteTratamento,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
