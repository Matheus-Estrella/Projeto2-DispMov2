import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ForecastScreen from './screens/ForecastScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Previsão do Tempo' }} />
        <Stack.Screen name="Forecast" component={ForecastScreen} options={{ title: 'Previsão Detalhada' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Cidades Favoritas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}