import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/user/password-change/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword, confirm_password: confirmPassword }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Password has been reset');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Password</Text>
      <ScrollView>
        <TextInput placeholder="New Password" value={newPassword} onChangeText={setNewPassword} style={styles.input} secureTextEntry />
        <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text>Reset Password</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default ResetPasswordScreen;
