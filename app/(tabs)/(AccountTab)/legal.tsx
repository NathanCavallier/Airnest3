import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Legal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mentions Légales</Text>
      {/* Ajoutez le contenu des mentions légales ici */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Legal;
