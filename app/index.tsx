import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { supabase } from '../utils/supabase';

interface Case {
  id: string;
  title: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
}

export default function MapScreen() {
  const [cases, setCases] = useState<Case[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Fetch cases from Supabase
      const { data, error } = await supabase.from('cases').select('*').eq('status', 'active');
      if (!error && data) {
        setCases(data);
      }
    })();
  }, []);

  const initialRegion = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  } : {
    latitude: -33.4489, // Santiago default fallback
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
        {cases?.map((c) => {
          let pinColor = '#E87040';
          if (c.type === 'found') pinColor = '#4CAF50';
          if (c.type === 'adoption') pinColor = '#3B82F6';

          return (
            <Marker
              key={c.id.toString()}
              coordinate={{ latitude: c.latitude, longitude: c.longitude }}
              pinColor={pinColor}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.calloutTitle}>{c.title}</Text>
                  <Text style={styles.calloutDesc}>{c.description}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
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
