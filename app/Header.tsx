import React, { useContext, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { MenuContext } from '@/contexts/MenuContext';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';



export default function Header() {
  const { openMenu } = useContext(MenuContext) || {};
  const navigation = useNavigation();
  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  var routes = navigation.getParent();
  const state = navigation.getState();
  const currentRoute = state?.routes[state.index] || { name: 'HomeScreen'};

  // Code pour ouvrir la recherche
  const openSearch = () => {
    if (isSearch) {
      router.push('SearchScreen');
      router.canGoBack();
      setIsSearch(false);
    } else if(router.canGoBack()) {
      setIsSearch(true);
      router.navigate(currentRoute.name);
    }
  };

  // Code pour ouvrir le panier
  const openCart = () => {
  };

  // Code pour ouvrir le compte
  const openAccount = () => {
  };

  function switchMenuIcon() {
    setIsMenu(!isMenu);
    
  }

  function switchSearchIcon(is_search: boolean) {
    setIsSearch(is_search);
    if(isSearch) {
      setIsMenu(false);
    }
  }

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 55 }}>
        <TouchableOpacity onPress={() => { /* code pour ouvrir le menu */ }}>
          <Image source={require('@/assets/images/Logo_airneis_store.jpeg')} style={{ width: 100, height: 40 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 120 }}>
          <TouchableOpacity onPress={() => { openSearch() }} style={{ marginRight: 15 }}>
            {isSearch ? <Ionicons name="search" size={28} color="gray" /> : <Ionicons name="close" size={28} color="gray" />}
          </TouchableOpacity>
          <TouchableOpacity onPressIn={switchMenuIcon}>
            {isMenu ? <Ionicons name="close" size={28} color="gray" /> : <Ionicons name="menu" size={28} color="gray" />}
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}