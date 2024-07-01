import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';

const Cgu = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(AccountTab)/AccountScreen')}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Ionicons name="arrow-back" size={24} color="gray" />
          <Text style={styles.header}>Conditions Générales d'Utilisation</Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {/* Ajoutez le contenu des CGU ici */}
        <Text>
        Conditions générales d'utilisation :
          En utilisant le site www.airneis.com, vous acceptez les conditions générales d'utilisation suivantes :

          - Vous vous engagez à respecter les conditions générales d'utilisation.
          
          - Vous vous engagez à respecter les lois en vigueur.
          
          - Vous vous engagez à ne pas utiliser le site à des fins illégales.
          
          - Vous vous engagez à ne pas copier, reproduire ou distribuer le contenu du site sans autorisation.
          
          - Vous vous engagez à ne pas perturber le fonctionnement du site.
          
          - Vous vous engagez à ne pas collecter des données personnelles de manière abusive.
          
          - Vous vous engagez à ne pas publier de contenu offensant ou inapproprié.
          
          - Vous vous engagez à respecter la vie privée des autres utilisateurs.
          
          - Vous vous engagez à ne pas utiliser de faux comptes.
          
          - Vous vous engagez à ne pas utiliser des logiciels malveillants.
          
          - Vous vous engagez à ne pas violer les droits d'auteur.
          
          - Vous vous engagez à ne pas publier de fausses informations.
          
          - Vous vous engagez à ne pas usurper l'identité d'une autre personne.
          
          - Vous vous engagez à ne pas diffuser de contenu illégal.
          
          - Vous vous engagez à ne pas diffuser de contenu discriminatoire.
          
          - Vous vous engagez à ne pas diffuser de contenu violent.
          
          - Vous vous engagez à ne pas diffuser de contenu pornographique.
          
          - Vous vous engagez à ne pas diffuser de contenu haineux.
          
          - Vous vous engagez à ne pas diffuser de contenu diffamatoire.
          
          - Vous vous engagez à ne pas diffuser de contenu injurieux.
          
          - Vous vous engagez à ne pas diffuser de contenu menaçant.
          
          - Vous vous engagez à ne pas diffuser de contenu incitant à la haine.
          
          - Vous vous engagez à ne pas diffuser de contenu incitant à la violence.
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
  },
  button: {
    marginBottom: 20,
  },
});

export default Cgu;
