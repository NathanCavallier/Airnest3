import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import SearchScreen from './(tabs)/(SearchTab)/SearchScreen';
import CartScreen from './(tabs)/(CartTab)/CartScreen';
import AccountScreen from './(tabs)/(AccountTab)/AccountScreen';



export default function Header() {
  return (

    <ThemedView>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 55 }}>
      <TouchableOpacity onPress={() => { /* code pour ouvrir le menu */ }}>
        <Image source={require('@/assets/images/Logo_airneis_store.jpeg')} style={{ width: 100, height: 40 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 120 }}>
        <TouchableOpacity onPress={() => { /* code pour ouvrir la recherche */ }}>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* code pour ouvrir le panier */ }}>
          <Ionicons name="cart" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* code pour ouvrir le menu */ }}>
          <Ionicons name="menu" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
    </ThemedView>
  );
}