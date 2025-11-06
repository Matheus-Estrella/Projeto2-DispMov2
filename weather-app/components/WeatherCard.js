import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

function getIconName(condition) {
  const c = (condition || '').toLowerCase();
  if (c.includes('nuvem')) return 'weather-cloudy';
  if (c.includes('chuva')) return 'weather-rainy';
  if (c.includes('tempestade') || c.includes('trovoada')) return 'weather-lightning';
  if (c.includes('neve')) return 'weather-snowy';
  if (c.includes('névoa') || c.includes('neblina') || c.includes('fog')) return 'weather-fog';
  if (c.includes('nublado')) return 'weather-partly-cloudy';
  return 'weather-sunny';
}

/**
 * @param {{weather: any, onFavorite?: (name:string)=>void}} props
 */
export default function WeatherCard({ weather, onFavorite }) {
  if (!weather) return null;
  const { name, main, weather: arr } = weather;
  const description = arr && arr.length > 0 ? arr[0].description : '';
  const icon = getIconName(description);

  return (
    <LinearGradient
      colors={[colors.primary, colors.accent]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.header}>
        <Text style={styles.city}>{name}</Text>
        {onFavorite && (
          <TouchableOpacity onPress={() => onFavorite(name)} accessibilityRole="button">
            <Text style={styles.star}>★</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name={icon} size={48} color="white" />
        <Text style={styles.temperature}>{main?.temp?.toFixed(1)}°C</Text>
      </View>

      <Text style={styles.description}>{description}</Text>
      <Text style={styles.humidity}>Umidade: {main?.humidity}%</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  city: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  star: { color: '#FFD166', fontSize: 26 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.sm },
  temperature: { color: 'white', fontSize: 52, fontWeight: '800' },
  description: { color: 'white', opacity: 0.95, fontSize: 16, marginTop: 2, textTransform: 'capitalize' },
  humidity: { color: 'white', opacity: 0.85, marginTop: 2 },
});