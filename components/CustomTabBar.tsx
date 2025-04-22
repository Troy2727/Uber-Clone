import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.activeTab]}
          >
            <Ionicons
              name={getIconName(route.name, isFocused)}
              size={24}
              color={isFocused ? '#0286FF' : '#999999'}
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getIconName = (routeName: string, isFocused: boolean) => {
  let iconName = 'home';
  
  if (routeName === 'home') {
    iconName = isFocused ? 'home' : 'home-outline';
  } else if (routeName === 'rides') {
    iconName = isFocused ? 'list' : 'list-outline';
  } else if (routeName === 'chat') {
    iconName = isFocused ? 'chatbubble' : 'chatbubble-outline';
  } else if (routeName === 'profile') {
    iconName = isFocused ? 'person' : 'person-outline';
  }
  
  return iconName as any;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 65,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: 'rgba(2, 134, 255, 0.1)',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  activeLabel: {
    color: '#0286FF',
    fontWeight: 'bold',
  },
});

export default CustomTabBar;
