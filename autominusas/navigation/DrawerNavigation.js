import React from "react";

import { createDrawerNavigator, DrawerContent, DrawerItemList, DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { StyleSheet, View, Image, Text } from 'react-native';
import ProfileScreen from "../screens/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from '@expo/vector-icons';
import { auth, firebase } from '../firebase';
import AddVehicleScreen from "../screens/AddVehicleScreen";
import MyVehiclesScreen from "../screens/MyVehiclesScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import VehicleScreen from "../screens/VehicleScreen";
import LikedVehiclesScreen from "../screens/LikedVehiclesScreen";

const Drawer = createDrawerNavigator();

const iconMap = {
  Pagrindinis: 'md-home',
  'Mano profilis': 'md-settings',
  'Mano skelbimai': 'car-sport',
  'Įkelti skelbimą': 'add-circle',
  'Įsiminti skelbimai': 'heart-circle-outline',
};

let imageURL;
let fullName;

function DrawerHeader() {
  const user = auth.currentUser;
  let userData = {};
  firebase.firestore().doc(`users/${user.uid}`).get()
  .then(doc => {
    userData = doc.data();
    console.log(userData)
    fullName = userData.fullName;
    imageURL = userData.imageURL;
    if(imageURL === undefined) imageURL = 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
  })
  .catch(error => {
    console.log('Error getting document: ', error);
  }); 
  return (
    <View style={styles.drawerHeader}>
      <Image
        source={{uri: imageURL}}
        style={styles.profilePicture}
      />
      <Text style={styles.drawerHeaderText}>{fullName}</Text>
    </View>
  );
}

const DrawerNavigator = ({ navigation }) => {

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <Drawer.Navigator
    backBehavior='history'
    screenOptions={({ route }) => ({
      drawerIcon: ({ focused, color, size }) => {
        const iconName = iconMap[route.name];
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      drawerStyle: styles.drawerBackground,
      drawerLabelStyle: styles.drawerLabel,
      drawerActiveTintColor: '#B46060',
    })}
    drawerContent={props => (
      <SafeAreaView style={{ flex: 4, height: '100%' }}>
        {/* <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainer}> */}
          <DrawerHeader />
          <DrawerItemList {...props} />
        {/* </DrawerContentScrollView> */}
        <View style={styles.logoutContainer}>
          <DrawerItem
            labelStyle={styles.logoutStyle}
            label="Atsijungti"
            icon={({ color, size }) => <Ionicons name="md-log-out" size={size} color={color} />}
            onPress={handleSignOut}
          />
        </View>
      </SafeAreaView>
    )}

    >
      <Drawer.Screen options={{ headerShown: false}} name="Pagrindinis" component={HomeScreen} />
      <Drawer.Screen options={{ headerShown: false}} name="Mano profilis" component={ProfileScreen} />
      <Drawer.Screen options={{ headerShown: false}} name="Mano skelbimai" component={MyVehiclesScreen} />
      <Drawer.Screen options={{ headerShown: false}} name="Įkelti skelbimą" component={AddVehicleScreen} />
      <Drawer.Screen options={{ headerShown: false}} name="Įsiminti skelbimai" component={LikedVehiclesScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerBackground: {
    backgroundColor: '#FFF4E0',
  },
  drawerLabel: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeDrawerLabel: {
    color: '#B46060',
    fontSize: 16,
    fontWeight: 'bold',
  },
  drawerHeader: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF4E0',
  },
  drawerHeaderText: {
    color: '#4D4D4D',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15
  },
  profilePicture: {
    width: 125,
    height: 125,
    borderRadius: 62,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  logoutStyle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700'
  },
  drawerContentContainer: {
    //flex: 4
    //height: '100%'
  }
});

export default DrawerNavigator;