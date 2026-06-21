import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  baseBotao: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  primaryBotao: {
    backgroundColor: '#3B75B0',
  },
  secondaryBotao: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(160, 160, 160, 0.42)',
  },
  disabledBotao: {
    opacity: 0.6,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  primaryTexto: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  secondaryTexto: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',

  },
});