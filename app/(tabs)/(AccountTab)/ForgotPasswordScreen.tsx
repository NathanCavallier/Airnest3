import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/user/password-reset/${email}/`);
      if (response.ok) {
        Alert.alert('Success', 'Password reset email sent');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to send password reset email');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mot de passe oublié</Text>
      <ScrollView>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text>Réinitialiser le mot de passe</Text>
        </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
      padding: 10,
      backgroundColor: '#ddd',
      borderRadius: 5,
      marginRight: 5,
      alignItems: 'center',
      width: '50%',
  },
  simpleText: {
      alignItems: 'center',
      color: 'gray',
      marginTop: 10,
  },
});

export default ForgotPasswordScreen;
