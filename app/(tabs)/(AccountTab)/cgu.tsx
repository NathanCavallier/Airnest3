import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cgu = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conditions Générales d'Utilisation</Text>
      {/* Ajoutez le contenu des CGU ici */}
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

export default Cgu;
