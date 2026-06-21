import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { styles } from './style';
import { BotaoProps } from './type';



export const Botao = ({
  title,
  variante = 'primary', 
  carregando = false,
  fontSize,
  padding,
  icon,
  style,
  disabled,
  ...rest
}: BotaoProps) => {
  const isPrimary = variante === 'primary';

  const botaoStyles = [
    styles.baseBotao,
    isPrimary ? styles.primaryBotao : styles.secondaryBotao,
    padding !== undefined && { padding },
    disabled && styles.disabledBotao,
    style,
  ];

  const textStyles = [
    isPrimary ? styles.primaryTexto : styles.secondaryTexto,
    fontSize !== undefined && { fontSize },
  ];

  return (
    <TouchableOpacity 
      style={botaoStyles} 
      disabled={disabled || carregando} 
      {...rest}
      accessibilityRole="button"
    >
      {carregando ? (
        <ActivityIndicator color={isPrimary ? 'white' : '#3B75B0'} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

