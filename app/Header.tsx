import React, { useContext, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { MenuContext } from '@/contexts/MenuContext';
import { useNavigation } from '@react-navigation/native';
import { router, useRouter, useLocalSearchParams } from 'expo-router';



const Header = (isLoggedIn: {isLoggedIn: boolean}) => {
  const navigation = useNavigation();
  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
  const state = navigation.getState();
  const currentRoute = state?.routes[state.index] || { name: 'HomeScreen'};
  const [search, setSearch] = useState(true); // Variable pour désactiver le bouton de recherche
  const [searchOpacity, setSearchOpacity] = useState(1); // Variable pour gérer l'opacité du bouton de recherche
  const [menu, setMenu] = useState(false); // Variable pour désactiver le bouton de menu
  const [menuOpacity, setMenuOpacity] = useState(1); // Variable pour gérer l'opacité du bouton de menu

  // Code pour ouvrir la recherche
  const openSearch = () => {
    if (isSearch) {
      setMenuOpacity(0.5); // Diminuer l'opacité du bouton de menu
      setMenu(true); // Désactiver le bouton de menu
      router.push('SearchScreen');
      router.canGoBack();
      setIsSearch(false);
    } else if(router.canGoBack()) {
      setMenuOpacity(1); // Rétablir l'opacité du bouton de menu
      setMenu(false); // Réactiver le bouton de menu
      setIsSearch(true); 
      router.push('/');
    }
  };

  function switchMenuIcon() {
    setIsMenu(!isMenu);
    if(!isMenu) {
      setSearchOpacity(0.5); // Diminuer l'opacité du bouton de recherche
      setSearch(true); // Désactiver le bouton de recherche
      router.push('MenuScreen');
    } else if(router.canGoBack()) {
      setSearchOpacity(1); // Rétablir l'opacité du bouton de recherche
      setSearch(false); // Réactiver le bouton de recherche
      router.back();
    } 
  }

  return (
    <ThemedView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 55 }}>
        <TouchableOpacity onPress={() => { /* code pour ouvrir le menu */ }}>
          <Image source={require('@/assets/images/Logo_airneis_store.jpeg')} style={{ width: 100, height: 40 }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: 120 }}>
          <TouchableOpacity onPress={() => { openSearch() }} style={{ marginRight: 15 }} disabled={search}>
            {isSearch ? <Ionicons name="search" size={28} color="gray" style={{ opacity: searchOpacity }} /> : <Ionicons name="close" size={28} color="gray" />}
          </TouchableOpacity>
          <TouchableOpacity onPressIn={switchMenuIcon} style={{ opacity: menuOpacity }} disabled={menu}>
            {isMenu ? <Ionicons name="close" size={28} color="gray" /> : <Ionicons name="menu" size={28} color="gray" />}
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );

}

export default Header;