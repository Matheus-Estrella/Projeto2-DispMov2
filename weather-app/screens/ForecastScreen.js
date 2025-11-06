import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import WeatherService from '../services/WeatherService';
import ForecastItem from '../components/ForecastItem';
import ErrorMessage from '../components/ErrorMessage';

export default function ForecastScreen({ route }) {
  const { city } = route.params;
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await WeatherService.getForecast(city);
        setForecast(data.list);
      } catch (err) {
        setError('Erro ao carregar previsão.');
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, [city]);

  if (loading) {
    return <ActivityIndicator style={styles.center} size="large" color="#0000ff" />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ForecastItem forecastItem={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});