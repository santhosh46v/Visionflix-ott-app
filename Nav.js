import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import VideoScreen from "./screens/VideoScreen";
import MovieScreen from "./screens/MovieScreen";
import EpisodeScreen from "./screens/EpisodeScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BottomTab = () => {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarShowLabel: true,
    tabBarLabel: ({ focused }) => {
      return focused ? ( <Text style={{fontSize:11, color: '#5FAB2F', marginTop: -7 }}>{route.name}</Text> ) :null;
    },
    tabBarIcon: ({ color, size, focused }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Videos') {
        iconName = 'videocam';
      } else if (route.name === 'Movie') {
        iconName = 'easel';
      }

      return <Ionicons name={iconName} color={focused ? '#5FAB2F' : '#9D9D9D'} size={25} />;
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
  <Tab.Screen name="Movie" component={MovieScreen} options={{headerShown: false}} />
  
  
</Tab.Navigator>

  );
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTab" component={BottomTab} options={{ headerShown: false }}  />
      <Stack.Screen name="VideoTab" component={VideoScreen} />
      <Stack.Screen name="EpisodeTab" component={EpisodeScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}