import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { api } from '@/api';

const EditAccountScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Paramètres du compte</Text>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Informations personnelles</Text>
        <TextInput style={styles.input} placeholder="Nom complet" />
        <TextInput style={styles.input} placeholder="E-mail" />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />        
        <Button title="Gérer les adresses" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Carnet d'adresses (livraison et facturation)</Text>
        <Button title="Gérer les adresses" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Méthodes de paiement</Text>
        <Button title="Gérer les méthodes de paiement" onPress={() => {}} />
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});


export default EditAccountScreen;