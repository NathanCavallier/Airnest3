// screens/AccountSettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { api } from '@/api';

const AccountSettingsScreen = ({ userId }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleUpdateProfile = async () => {
        try {
            const profileData = { full_name: fullName, email, password };
            const updatedProfile = await api(userId, profileData);
            console.log('Profile updated successfully:', updatedProfile);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleUpdateAddress = async () => {
        // Ajoutez le code pour gérer la mise à jour de l'adresse ici
    };

    const handleUpdatePaymentMethod = async () => {
        // Ajoutez le code pour gérer la mise à jour des méthodes de paiement ici
    };

    return (
        <View style={styles.container}>
            <Text>Informations personnelles</Text>
            <TextInput value={fullName} onChangeText={setFullName} placeholder="Nom complet" style={styles.input} />
            <TextInput value={email} onChangeText={setEmail} placeholder="E-mail" style={styles.input} />
            <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry style={styles.input} />
            <Button title="Mettre à jour les informations personnelles" onPress={handleUpdateProfile} />

            <Text>Carnet d'adresses</Text>
            <TextInput value={address} onChangeText={setAddress} placeholder="Adresse de livraison et facturation" style={styles.input} />
            <Button title="Mettre à jour l'adresse" onPress={handleUpdateAddress} />

            <Text>Méthodes de paiement</Text>
            <TextInput value={paymentMethod} onChangeText={setPaymentMethod} placeholder="Méthodes de paiement" style={styles.input} />
            <Button title="Mettre à jour les méthodes de paiement" onPress={handleUpdatePaymentMethod} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default AccountSettingsScreen;
