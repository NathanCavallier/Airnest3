import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const MenuScreen: React.FC = () => {
    const { isLoggedIn } = useLocalSearchParams() as any;
    const router = useRouter();

    const onLogin = () => {
        router.push('login');
    };

    const onLogout = () => {
        router.push('app/(tabs)/(HomeTab)/index');
    };

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <>
                    <Text style={styles.menuItem} onPress={() => router.push('/AccountScreen')}>Mon compte</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('orders')}>Mes commandes</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('cgu')}>CGU</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('legal')}>Mentions légales</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('contact')}>Contact</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('about')}>À propos d’ÀIRNEIS</Text>
                    <Button title="Se déconnecter" onPress={onLogout} />
                </>
            ) : (
                <>
                    <Button title="Se connecter" onPress={onLogin} />
                    <Text style={styles.menuItem} onPress={() => router.push('RegisterScreen')}>S’inscrire</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('cgu')}>CGU</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('legal')}>Mentions légales</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('contact')}>Contact</Text>
                    <Text style={styles.menuItem} onPress={() => router.push('about')}>À propos d’ÀIRNEIS</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: '100%',
    },
    menuItem: {
        fontSize: 18,
        marginVertical: 10,
    },
});


export default MenuScreen;
