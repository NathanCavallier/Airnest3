import React, { useContext, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import SearchScreen from './(tabs)/(CategoryTab)/SearchScreen';
import SearchLayout from './(tabs)/(CategoryTab)/_layout';
import CartScreen from './(tabs)/(CartTab)/CartScreen';
import AccountScreen from './(tabs)/(AccountTab)/AccountScreen';
import { MenuContext } from '@/contexts/MenuContext';
import { useNavigation } from '@react-navigation/native';



export default function Header() {
  const { openMenu } = useContext(MenuContext) || {};
  const navigation = useNavigation();
  const [isMenu, setIsMenu] = useState(false);

  // Code pour ouvrir la recherche
  const openSearch = () => {
  };

  // Code pour ouvrir le panier
  const openCart = () => {
  };

  // Code pour ouvrir le compte
  const openAccount = () => {
  };

  function switchMenuIcon() {
    setIsMenu(!isMenu);
    //openMenu();
  }

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 55 }}>
        <TouchableOpacity onPress={() => { /* code pour ouvrir le menu */ }}>
          <Image source={require('@/assets/images/Logo_airneis_store.jpeg')} style={{ width: 100, height: 40 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 120 }}>
          <TouchableOpacity onPress={() => { openSearch }}>
            <Ionicons name="search" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* code pour ouvrir le panier */ }}>
            <Ionicons name="cart" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPressIn={switchMenuIcon}>
            {isMenu ? <Ionicons name="close" size={25} color="orange" /> : <Ionicons name="menu" size={24} color="gray" />}
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}