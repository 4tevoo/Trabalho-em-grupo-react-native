import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { PickerField } from '../Picker/PickerField';
import { TIPOS_DEFICIENCIA } from '../../types/deficiencias';
import { UserProfile } from '../../types/auth';
import { supabase } from '../../services/supabaseClient';
import Toast from 'react-native-toast-message';

interface Props {
  visible: boolean;
  userProfile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
}

export const PcdModal: React.FC<Props> = ({ visible, userProfile, onComplete }) => {
  const [selected, setSelected] = useState('nenhuma');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('usuario')
        .update({ tipo_deficiencia: selected })
        .eq('id', userProfile.id)
        .select()
        .single();
      if (error) throw error;
      Toast.show({ type: 'success', text1: 'Preferências salvas!' });
      onComplete({ ...userProfile, tipo_deficiencia: selected });
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erro', text2: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      transparent visible={visible} 
      animationType="slide"
      onRequestClose={() => handleSave()}
      accessibilityViewIsModal={true}
      aria-modal={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title} accessibilityRole="header">Para uma melhor experiência</Text>
          <Text style={styles.subtitle}>
            Você possui algum tipo de deficiência? Isso nos ajuda a adaptar o aplicativo para você.
          </Text>

          <PickerField
            label="Deficiência"
            selectedValue={selected}
            onValueChange={setSelected}
            items={TIPOS_DEFICIENCIA}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSave} 
            disabled={loading} 
            accessibilityRole="button"
            accessibilityLabel="Salvar opção selecionada"
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Salvar</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.skipButton} 
            onPress={handleSave}
            accessibilityRole="button"
            accessibilityLabel="Pular configuração"
            accessibilityHint="Salva a preferência como nenhuma deficiência e entra no sistema"
          >
            <Text style={styles.skipText}>Pular (salvar como nenhuma)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  skipText: {
    color: '#007AFF',
    fontSize: 14,
  },
});