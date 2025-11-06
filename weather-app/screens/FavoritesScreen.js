import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getFavorites, removeFavorite } from '../storage/Favorites';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const list = await getFavorites();
    setFavorites(list);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSelectCity = (city) => {
    // Envia também um timestamp para garantir re-render mesmo se a cidade for igual à anterior
    navigation.navigate('Home', { prefill: city, t: Date.now() });
  };

  const handleRemove = async (city) => {
    await removeFavorite(city);
    loadFavorites();
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text>Nenhuma cidade favoritada.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity onPress={() => handleSelectCity(item)} style={styles.cityButton}>
                <Text style={styles.cityName}>{item}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(item)}>
                <Text style={styles.remove}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  itemRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e0e0e0',
  },
  cityButton: { flex: 1 },
  cityName: { fontSize: 18 },
  remove: { color: '#b00020' },
});