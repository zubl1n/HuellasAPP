import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { trpc } from '../utils/trpc';
import * as Location from 'expo-location';

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const createCase = trpc.createCase.useMutation();

  const handleNext = async () => {
    if (!selectedType) return;
    
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Necesitamos tu ubicación para reportar el caso');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      
      await createCase.mutateAsync({
        title: selectedType === 'lost' ? 'Mascota Perdida' : selectedType === 'found' ? 'Mascota Encontrada' : 'Adopción',
        description: 'Reporte generado desde la app móvil.',
        type: selectedType,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      Alert.alert('¡Éxito!', 'El caso ha sido reportado en el mapa.', [
        { text: 'OK', onPress: () => setSelectedType(null) }
      ]);
    } catch (err) {
      Alert.alert('Error', 'Hubo un problema de conexión con el servidor.');
    }
  };

  const ReportOption = ({ type, title, icon, color }: { type: string, title: string, icon: any, color: string }) => (
    <TouchableOpacity
      style={[
        styles.optionCard,
        selectedType === type && { borderColor: color, backgroundColor: color + '10' }
      ]}
      onPress={() => setSelectedType(type)}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={32} color={color} />
      </View>
      <Text style={[styles.optionTitle, selectedType === type && { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nuevo Reporte</Text>
        <Text style={styles.headerSubtitle}>Paso 1 de 4: ¿Qué deseas reportar?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ReportOption
          type="lost"
          title="Perdí a mi mascota"
          icon="search"
          color="#E87040"
        />
        <ReportOption
          type="found"
          title="Encontré una mascota"
          icon="home"
          color="#4CAF50"
        />
        <ReportOption
          type="adoption"
          title="Dar en adopción"
          icon="heart"
          color="#3B82F6"
        />
        <ReportOption
          type="danger"
          title="Animal en peligro"
          icon="warning"
          color="#EF4444"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, (!selectedType || createCase.isPending) && styles.disabledButton]}
          disabled={!selectedType || createCase.isPending}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>{createCase.isPending ? 'Enviando...' : 'Reportar Inmediatamente'}</Text>
          {!createCase.isPending && <Ionicons name="arrow-forward" size={20} color="#ffffff" />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  footer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  nextButton: {
    backgroundColor: '#E87040',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
