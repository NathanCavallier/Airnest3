import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Menu = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const translateX = useSharedValue(width);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = withSpring(0);
    } else {
      translateX.value = withSpring(width);
    }
  }, [isVisible]);

  return (
    <PanGestureHandler onGestureEvent={(event) => {
      if (event.nativeEvent.translationX > 50) {
        onClose();
      }
    }}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuItem}>Item 1</Text>
          <Text style={styles.menuItem}>Item 2</Text>
          <Text style={styles.menuItem}>Item 3</Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: width * 0.75,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
  },
  menuContent: {
    padding: 16,
  },
  menuItem: {
    paddingVertical: 16,
    fontSize: 18,
  },
});

export default Menu;
