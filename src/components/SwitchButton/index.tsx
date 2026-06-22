import { Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native'
import { styles } from './style'
import React, { useState } from 'react'

type SwitchButtonProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  isActive?: boolean
  onPress?: () => void
}

export default function SwitchButton({ children, style, isActive, onPress }: SwitchButtonProps) {

  return (
    <TouchableOpacity
      style={[styles.button, style, isActive && styles.buttonOn]}
      onPress={() => {
        onPress?.()
      }}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected: !!isActive }}
      accessibilityLabel={`Filtro: ${children}`}
      accessibilityHint={isActive ? "Toque para desativar este filtro" : `Toque para filtrar o mapa por ${children}`}
    >

      <Text style={isActive ? styles.textOn : styles.textOff} importantForAccessibility="no">
        {children}
      </Text>

    </TouchableOpacity>
  )
}