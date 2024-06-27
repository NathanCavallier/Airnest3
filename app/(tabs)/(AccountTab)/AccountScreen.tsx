import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';

type Profile = {
    username: string;
    email: string;
    full_name: string;
    phone: string;
    last_login: string;
    date_joined: string;
};

const AccountScreen = ({ route }: { route: any }) => {
    const [profile, setProfile] = useState(null as unknown as Profile);
    const [loading, setLoading] = useState(true);
    const { userId } = useLocalSearchParams();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/user/profile/${userId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    router.push('RegisterScreen')
                }
            } catch (error) {
                console.log('Error', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) {
        return <ActivityIndicator size="large" color="orange" />;
    }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Profile</Text>
          {profile && (
            <>
              <Text>Username: {profile.username}</Text>
              <Text>Email: {profile.email}</Text>
              <Text>Full Name: {profile.full_name || 'N/A'}</Text>
              <Text>Phone: {profile.phone || 'N/A'}</Text>
              <Text>Last Login: {profile.last_login}</Text>
              <Text>Date Joined: {profile.date_joined}</Text>
            </>
          )}
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
    });

export default AccountScreen;
