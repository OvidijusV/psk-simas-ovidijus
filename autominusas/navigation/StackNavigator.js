import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import DrawerNavigator from "./DrawerNavigation";
import { auth, firebase } from '../firebase';
import VehicleScreen from "../screens/VehicleScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false}} name="AfterLogin" component={DrawerNavigator} />
        <Stack.Screen options={{ headerShown: false}} name="VehicleScreen" component={VehicleScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };