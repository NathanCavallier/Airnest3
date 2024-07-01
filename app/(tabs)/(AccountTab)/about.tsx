import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const About = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(AccountTab)/AccountScreen')}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Ionicons name="arrow-back" size={24} color="gray" />
          <Text style={styles.header}>À propos d'ÀIRNEIS</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {/* Ajoutez le contenu de la page à propos ici */}
        <Text>
          ÀIRNEIS est une application mobile de vente de mobilier d'intérieur. Nous proposons une large gamme de produits pour tous les styles et tous les budgets. Notre mission est de vous aider à trouver le mobilier parfait pour votre intérieur. N'hésitez pas à nous contacter si vous avez des questions ou des suggestions.
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

export default About;
