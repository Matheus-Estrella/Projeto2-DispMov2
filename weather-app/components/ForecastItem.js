import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

export default function ForecastItem({ forecastItem }) {
  if (!forecastItem) return null;
  const { dt, main, weather } = forecastItem;
  const date = new Date(dt * 1000);
  const hour = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const description = weather && weather.length > 0 ? weather[0].description : '';

  return (
    <View style={styles.row}>
      <Text style={styles.hour}>{hour}</Text>
      <Text style={styles.temp}>{main?.temp?.toFixed(0)}°</Text>
      <Text style={styles.desc} numberOfLines={1}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: 'white',
  },
  hour: { width: 70, fontWeight: '600', color: colors.text },
  temp: { width: 50, textAlign: 'center', fontSize: 18, fontWeight: '700', color: colors.text },
  desc: { flex: 1, color: colors.subtext, textTransform: 'capitalize' },
});