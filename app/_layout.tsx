import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import 'expo-dev-client';
import 'react-native-gesture-handler';
import 'react-native-safe-area-context';
import 'react-native-screens';
import Header from '@/app/Header';
import { MenuProvider } from '@/contexts/MenuContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const state = navigation.getState();
  const currentRouteName = state?.routes[state.index]?.name ?? '';
  const hideHeaderRoutes = ['LoginScreen', 'RegisterScreen', 'ForgotPasswordScreen', 'ResetPasswordScreen'];
  const shouldShowHeader = !hideHeaderRoutes.includes(currentRouteName);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <MenuProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="MenuScreen" options={{ title: "Menu", headerShown: false }} initialParams={{ isLoggedIn }} />
            <Stack.Screen name="Menu" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="LoginScreen" options={{ title: "Connexion", headerShown: false }} />
            <Stack.Screen name="RegisterScreen" options={{ title: "Inscription", headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" options={{ title: "Mot de passe oublié", headerShown: false }} />
            <Stack.Screen name="ResetPasswordScreen" options={{ title: "Réinitialiser le mot de passe", headerShown: false }} />
          </Stack>
      </ThemeProvider>
    </MenuProvider>
  );
}
