import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/user/token/', {
                method: 'OPTIONS',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            console.log('Response', response);

            if (response.ok) {
                const data = await response.json();
                // Store the token (for example in AsyncStorage)
                Alert.alert('Success', 'Login successful');
                router.push({
                    pathname: 'AccountScreen',
                    params: {
                        userId: data.user_id
                    },
                });
            } else {
                const data = await response.json();
                Alert.alert('Error', data.message || 'Login failed');
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Se connecter</Text>
            <ScrollView>
                <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
                <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text>Se connecter</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.simpleText} onPress={() => router.push('/(AccountTab)/ForgotPasswordScreen')}>
                <Text>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.simpleText} onPress={() => router.push('/(AccountTab)/RegisterScreen')}>
                <Text>Créer un compte</Text>
            </TouchableOpacity>
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

export default LoginScreen;
