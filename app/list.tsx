import React from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CaseCard from '../components/CaseCard';

const MOCK_DATA = [
  { id: '1', title: 'Poodle Perdido en el parque', description: 'Se perdió cerca del parque forestal. Llevaba un collar rojo con placa.', type: 'lost' as const, distance: '1.2 km', timeAgo: 'Hace 2 horas' },
  { id: '2', title: 'Gato Atigrado', description: 'Encontrado en un árbol, muy asustado pero dócil. Está a salvo ahora.', type: 'found' as const, distance: '300 m', timeAgo: 'Hace 5 horas' },
  { id: '3', title: 'Cachorritos en Adopción', description: '3 perritos mestizos buscan un hogar amoroso.', type: 'adoption' as const, distance: '5.0 km', timeAgo: 'Ayer' },
  { id: '4', title: 'Golden Retriever', description: 'Visto corriendo por la avenida principal.', type: 'lost' as const, distance: '2.5 km', timeAgo: 'Hace 10 min' },
];

export default function ListScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Casos Cercanos</Text>
        <Text style={styles.headerSubtitle}>Encuentra mascotas que necesitan tu ayuda</Text>
      </View>
      
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CaseCard
            title={item.title}
            description={item.description}
            type={item.type}
            distance={item.distance}
            timeAgo={item.timeAgo}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F0', // Fondo claro cálido del Pitch Deck
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});
