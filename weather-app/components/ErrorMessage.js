import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Componente para exibir mensagens de erro.
 * @param {object} props
 * @param {string} props.message Mensagem de erro a ser exibida
 */
export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdecea',
    borderRadius: 4,
    padding: 10,
    marginVertical: 8,
  },
  text: {
    color: '#b00020',
    textAlign: 'center',
  },
});