import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// picka-picka! ~ disse Pickachu depois de pickar algo

interface PickerFieldProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: readonly { label: string; value: string }[];
  error?: string;
}

export const PickerField: React.FC<PickerFieldProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
  error,
}) => {

  const itemAtual = items.find(i => i.value === selectedValue)?.label || selectedValue;
  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityRole="combobox"
      accessibilityLabel={`${label}. Selecionado atualmente: ${itemAtual}`}
      accessibilityHint="Toque duas vezes para abrir as opções de seleção."
    >
      <Text style={styles.label} importantForAccessibility="no">{label}</Text>
      <View style={[styles.pickerContainer, error && styles.errorBorder]} pointerEvents="none">
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText} accessibilityLiveRegion="assertive">{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});