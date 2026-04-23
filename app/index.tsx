import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const MOCK_CASES = [
  { id: '1', title: 'Perro Perdido', description: 'Poodle blanco, collar rojo.', type: 'lost', latitude: -33.4489, longitude: -70.6693, color: '#E87040' },
  { id: '2', title: 'Gato Encontrado', description: 'Gato gris atigrado, muy dócil.', type: 'found', latitude: -33.4372, longitude: -70.6506, color: '#4CAF50' },
  { id: '3', title: 'En Adopción', description: 'Cachorro mestizo busca hogar.', type: 'adoption', latitude: -33.4569, longitude: -70.6483, color: '#3B82F6' },
];

export default function MapScreen() {
  const initialRegion = {
    latitude: -33.4489,
    longitude: -70.6693,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      {/* Header flotante */}
      <SafeAreaView edges={['top']} style={styles.headerContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <Text style={styles.searchText}>Buscar cerca de Santiago...</Text>
        </View>
      </SafeAreaView>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {MOCK_CASES.map((c) => (
          <Marker
            key={c.id}
            coordinate={{ latitude: c.latitude, longitude: c.longitude }}
            pinColor={c.color}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{c.title}</Text>
                <Text style={styles.calloutDesc}>{c.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Botón flotante de mi ubicación */}
      <View style={styles.locationButton}>
        <Ionicons name="navigate" size={24} color="#1A1A2E" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  searchText: {
    marginLeft: 10,
    color: '#6B7280',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  locationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#ffffff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1A1A2E',
    marginBottom: 4,
  },
  calloutDesc: {
    fontSize: 12,
    color: '#6B7280',
  },
});
