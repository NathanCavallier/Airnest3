import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { api } from '@/api';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            api.post('http://localhost:8000/api/v1/user/register/', {
                boby: JSON.stringify({
                    username,
                    email,
                    password,
                })
            })
                .then(response => {
                    if (response.data.success) {
                        Alert.alert('Success', 'Registration successful');
                        router.push({
                            pathname: 'AccountScreen',
                            params: {
                                userId: response.data.user_id,
                            },
                        });
                    } else {
                        Alert.alert('Error', response.data.message || 'Registration failed');
                    }
                })
    .catch(error => {
        Alert.alert('Error', 'Registration failed');
        console.log('Error', error);
    });
        } catch (error) {
    console.log('Error', error);
}
    };

return (
    <View style={styles.container}>
        <Text style={styles.header}>Inscription</Text>
        <ScrollView>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput textContentType='emailAddress' placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text>Inscription</Text>
            </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.simpleText} onPress={() => router.push('/(AccountTab)/LoginScreen')}>
            <Text>Se connecter</Text>
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

export default RegisterScreen;
