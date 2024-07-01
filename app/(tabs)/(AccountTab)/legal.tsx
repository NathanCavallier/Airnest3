import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView } from 'react-native';

const Legal = () => {
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={() => router.push('/(AccountTab)/AccountScreen')}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Ionicons name="arrow-back" size={24} color="gray" />
        <Text style={styles.header}>Mentions Légales</Text>
      </View>
    </TouchableOpacity>
    <ScrollView>
      {/* Ajoutez le contenu des mentions légales ici */}
      <Text>
          Le site www.airneis.com est édité par la société ÀIRNEIS, SAS au capital de 15.000€, immatriculée au RCS de Paris sous le numéro 123456789, dont le siège social est situé 1 rue de Rivoli, 75001 Paris, France.
          Directeur de la publication : Jean Dupont
          Contact :
          - Email : 
          - Téléphone :
          - Adresse postale : 1 rue de Rivoli, 75001 Paris, France
          Hébergeur : OVH, 2 rue Kellermann, 59100 Roubaix, France
      </Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
    marginLeft: 10,
  },
  button: {
    marginBottom: 20,
  },
});

export default Legal;
