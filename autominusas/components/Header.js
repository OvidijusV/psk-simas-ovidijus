import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image  } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native'


const HeaderApp = ( { prevScreen } ) => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.name)
  return (
    <View style={styles.container}>
      <View style={styles.leftHeader}>
        {prevScreen === 'Pagrindinis' 
        ? (<TouchableOpacity onPress={() => navigation.replace('AfterLogin', {screen: 'Pagrindinis'})}><Feather name="arrow-left" size={28} color="black"/></TouchableOpacity>)
        : prevScreen === 'Mano skelbimai'
        ? (<TouchableOpacity onPress={() => navigation.replace('AfterLogin', {screen: 'Mano skelbimai'})}><Feather name="arrow-left" size={28} color="black"/></TouchableOpacity>)
        : (<TouchableOpacity onPress={() => navigation.toggleDrawer()}><Feather name="menu" size={28} color="black"/></TouchableOpacity>)
        } 
        {/* <TouchableOpacity onPress={() => navigation.toggleDrawer()}><Feather name="menu" size={28} color="black"/></TouchableOpacity> */}
      </View>
      <View style={styles.rightHeader}>
        <Text style={{marginRight: 5, fontFamily: 'serif', fontSize: 18}}>Autominusas</Text>
        <Image source={require('../assets/autominusassmall.png')} style={styles.imageStyle}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFBF9B',
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  leftHeader: {
    flex: 1,
    marginLeft: 15
  },
  rightHeader: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10

  },
  imageStyle: {
    width: 80,
    height: 80,
  },
})

export default HeaderApp