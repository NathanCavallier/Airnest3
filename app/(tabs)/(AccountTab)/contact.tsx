import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Contact = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(AccountTab)/AccountScreen')}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Ionicons name="arrow-back" size={24} color="gray" />
          <Text style={styles.header}>Contact</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {/* Ajoutez le contenu de la page de contact ici */}
      </ScrollView>
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
    color: 'gray',
    marginLeft: 10,
  },
  button: {
    marginBottom: 20,
  },
});

export default Contact;
