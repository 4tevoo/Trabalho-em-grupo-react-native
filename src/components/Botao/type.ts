import { TouchableOpacityProps } from "react-native";

export interface BotaoProps extends TouchableOpacityProps {
  title: string;
  variante?: 'primary' | 'secondary';
  carregando?: boolean;
  fontSize?: number;
  padding?: number;
  icon?: React.ReactNode;
}