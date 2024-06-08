import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import SearchScreen from './(tabs)/(SearchTab)/SearchScreen';
import CartScreen from './(tabs)/(CartTab)/CartScreen';
import AccountScreen from './(tabs)/(AccountTab)/AccountScreen';
import { MenuProvider, useMenu } from '@/contexts/MenuContext';



export default function Header() {

  // Fonction pour changer l'icône du menu
  const menuIconSwitch = () => {
    const { isMenuVisible, openMenu, closeMenu } = useMenu();
    if (isMenuVisible) {
      return <Ionicons name="close" size={24} color="gray" />;
    } else {
      return <Ionicons name="menu" size={24} color="gray" />;
    }
  }

  return (
    <MenuProvider>
      <ThemedView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 55 }}>
          <TouchableOpacity onPress={() => { /* code pour ouvrir le menu */ }}>
            <Image source={require('@/assets/images/Logo_airneis_store.jpeg')} style={{ width: 100, height: 40 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 120 }}>
            <TouchableOpacity onPress={() => { /* code pour ouvrir la recherche */ }}>
              <Ionicons name="search" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { CartScreen }}>
              <Ionicons name="cart" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { useMenu }}>
              {menuIconSwitch()}
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </MenuProvider>
  );
}