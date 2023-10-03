import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../firebase'
import HeaderApp from '../components/Header'
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [imageURL, setImageURL] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');

  let userData = {};
  firebase.firestore().doc(`users/${user.uid}`).get()
  .then(doc => {
    userData = doc.data();
    console.log(userData)
    setFullName(userData.fullName);
    setImageURL(userData.imageURL);
    setPhoneNumber(userData.phoneNumber);
    if(imageURL === undefined) setImageURL('https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max')
  })
  .catch(error => {
    console.log('Error getting document: ', error);
  }); 

    // Request permission to access the device's gallery and camera
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false, // Disable multiple image selection
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUris = result.assets.map(asset => asset.uri); // Access selected images from "assets" array
      setImageURL(selectedImageUris);
    }
  };

  const handlePhoneNumberChange = (text) => {
    // Remove any non-digit characters from the input
    const formattedPhoneNumber = text.replace(/[^+0-9]/g, '');
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderApp></HeaderApp>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.profileTitle}>Mano profilis</Text>
          <Image source={{ uri: imageURL }} style={styles.profilePicture} />
          <TouchableOpacity style={[styles.button, styles.buttonImage]} onPress={pickImages}><Text style={styles.buttonText}>Keisti nuotrauką</Text></TouchableOpacity> 
          <Text style={styles.userDataTxt}>{fullName}</Text>
          <Text style={styles.userDataTxt}>{user.email}</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
            placeholder="Telefono numeris"
            maxLength={12}
          />
        <View style={styles.updateProfile}>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Atnaujinti profilį</Text></TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF4E0'
  },
  button: {
    backgroundColor: '#B46060',
    width: '60%',
    height: 50,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonImage: {
    width: '40%',
    height: 40,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  headerContainer: {
    width: '100%',
    flex: 1,
  },
  dataContainer: {
    flex: 13,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  profilePicture: {
    width: 175,
    height: 175,
    borderRadius: 87,
  },
  updateProfile: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10
  },
  userDataTxt: {
    fontSize: 16,
    fontWeight: '500',
  }

})