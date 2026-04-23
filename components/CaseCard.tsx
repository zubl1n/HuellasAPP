import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CaseCardProps {
  title: string;
  description: string;
  type: 'lost' | 'found' | 'adoption';
  distance: string;
  timeAgo: string;
}

export default function CaseCard({ title, description, type, distance, timeAgo }: CaseCardProps) {
  let badgeColor = '#E87040'; // Naranjo (Perdido)
  let badgeText = 'Perdido';

  if (type === 'found') {
    badgeColor = '#4CAF50'; // Verde (Encontrado)
    badgeText = 'Encontrado';
  } else if (type === 'adoption') {
    badgeColor = '#3B82F6'; // Azul (Adopción)
    badgeText = 'Adopción';
  }

  return (
    <View style={styles.card}>
      <View style={[styles.imagePlaceholder, { backgroundColor: badgeColor + '20' }]}>
        <Ionicons name="paw" size={40} color={badgeColor} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
          <Text style={styles.timeText}>{timeAgo}</Text>
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.distance}>{distance}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  distance: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});
