import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ReportScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

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
          style={[styles.nextButton, !selectedType && styles.disabledButton]}
          disabled={!selectedType}
        >
          <Text style={styles.nextButtonText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
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
