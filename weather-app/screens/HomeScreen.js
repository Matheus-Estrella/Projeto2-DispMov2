import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WeatherService from '../services/WeatherService';
import WeatherCard from '../components/WeatherCard';
import ErrorMessage from '../components/ErrorMessage';
import { addFavorite } from '../storage/Favorites';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radius } from '../theme';

export default function HomeScreen({ navigation, route }) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 💡 Agora aceita um parâmetro opcional com a cidade alvo.
  const handleSearch = async (targetCity = city) => {
    if (!targetCity) return;
    setLoading(true);
    setError('');
    try {
      const data = await WeatherService.getCurrentWeather(targetCity);
      setWeather(data);
    } catch (err) {
      setError('Não foi possível buscar a previsão. Verifique a cidade ou sua conexão.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Quando navegar com parâmetro prefill, define a cidade e já busca usando o valor recebido
  React.useEffect(() => {
    if (route?.params?.prefill) {
      const newCity = route.params.prefill;
      setCity(newCity);
      // 🔧 Chama com o valor novo (não depende do setState assíncrono)
      handleSearch(newCity);
    }
    // Se você decidiu mandar um timestamp no navigate, pode observar também route?.params?.t
  }, [route?.params?.prefill]);

  const handleForecast = () => {
    if (weather) navigation.navigate('Forecast', { city: weather.name });
  };

  const handleAddFavorite = async (cityName) => {
    await addFavorite(cityName);
    alert(`${cityName} adicionada aos favoritos!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite a cidade"
          placeholderTextColor="#9CA3AF"
          value={city}
          onChangeText={setCity}
          autoCorrect={false}
          autoCapitalize="words"
          returnKeyType="search"
          onSubmitEditing={() => handleSearch()}
        />
        <PrimaryButton title="Buscar" onPress={() => handleSearch()} style={{ minWidth: 90 }} />
      </View>

      {loading && <ActivityIndicator size="large" />}
      {!!error && <ErrorMessage message={error} />}

      {weather && !loading && (
        <>
          <WeatherCard weather={weather} onFavorite={handleAddFavorite} />
          <PrimaryButton
            title="Ver previsão de curto prazo"
            onPress={handleForecast}
            style={{ marginTop: spacing.md }}
          />
        </>
      )}

      <Text style={styles.link} onPress={() => navigation.navigate('Favorites')}>
        Ver favoritos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.bg },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: 0.2, color: colors.text, marginBottom: spacing.md },
  searchRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1, borderColor: colors.divider,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    color: colors.text,
  },
  link: { marginTop: spacing.lg, textAlign: 'center', color: colors.primary, fontWeight: '600' },
});