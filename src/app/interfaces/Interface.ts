import { TextInputProps } from "react-native";

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
