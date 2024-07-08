import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/api';

type Profile = {
  image: string | undefined;
  username: string;
  email: string;
  full_name: string;
  phone: string;
  last_login: string;
  date_joined: string;
};

const AccountScreen = ({ route }: { route: any }) => {
  const { userId } = useLocalSearchParams as unknown as { userId: string };
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [methodsOfPayment, setMethodsOfPayment] = useState<string[]>([]);

  useEffect(() => {
    api.get(`http://localhost:8000/api/v1/user/profile/${1}/`)
      .then(response => {
        setProfile(response.data);
        setFullName(response.data.full_name);
        setEmail(response.data.user.email);
        setAddress(response.data.address);
        setCity(response.data.city);
        setState(response.data.state);
        setCountry(response.data.country);
        setGender(response.data.gender);
        setAbout(response.data.about);
        // Ajoutez d'autres champs si nécessaire
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);

  const handleSaveChanges = () => {
    const updatedProfile = {
      full_name: fullName,
      user: {
        email: email,
        password: password,
      },
      address: address,
      city: city,
      state: state,
      country: country,
      gender: gender,
      about: about,
      // Ajoutez d'autres champs si nécessaire
    };

    api.put(`http://localhost:8000/api/v1/user/profile/${1}/`, updatedProfile)
      .then(response => {
        alert('Profile updated successfully');
        setProfile(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!profile) {
    return <ActivityIndicator size={'large'} color={'orange'} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Mon compte</Text>
      <Image source={{ uri: profile.image }} style={styles.profileImage} />
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Informations personnelles</Text>
        <TextInput
          placeholder="Nom complet"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Genre"
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />
        <TextInput
          placeholder="À propos"
          value={about}
          onChangeText={setAbout}
          style={styles.input}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Adresse</Text>
        <TextInput
          placeholder="Adresse"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          placeholder="Ville"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        <TextInput
          placeholder="État"
          value={state}
          onChangeText={setState}
          style={styles.input}
        />
        <TextInput
          placeholder="Pays"
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Méthodes de paiement</Text>
        <TextInput
          placeholder="Méthode de paiement"
          value={methodsOfPayment.join(', ')}
          onChangeText={text => setMethodsOfPayment(text.split(', '))}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={{ color: 'black' }}>Enregistrer les modifications</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Button title="Mes commandes" onPress={() => router.push('/(tabs)/(AccountTab)/Orders')} />
        <Button title="Se déconnecter" onPress={() => router.push('app/(tabs)/(HomeTab)/index')} />
        <Button title="CGU" onPress={() => router.push('/(tabs)/(AccountTab)/Cgu')} />
        <Button title="Mentions légales" onPress={() => router.push('/(tabs)/(AccountTab)/Legal')} />
        <Button title="Contact" onPress={() => router.push('/(tabs)/(AccountTab)/Contact')} />
        <Button title="À propos d’ÀIRNEIS" onPress={() => router.push('/(tabs)/(AccountTab)/About')} />
        <Button title="Supprimer le compte" onPress={() => Alert.alert('Supprimer le compte', 'Êtes-vous sûr de vouloir supprimer votre compte ?', [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            style: 'destructive',
            onPress: () => {
              api.delete(`http://localhost:8000/api/v1/user/profile/${1}/`)
                .then(() => {
                  alert('Compte supprimé avec succès');
                  router.push('app/(tabs)/(HomeTab)/index');
                })
                .catch(error => {
                  console.error(error);
                });
            },
          },
        ])} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: 'white',
  },
});


export default AccountScreen;
