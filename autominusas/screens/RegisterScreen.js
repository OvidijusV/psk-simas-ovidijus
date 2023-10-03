import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Linking, Button, ScrollView  } from 'react-native'
import React, { useEffect, useState} from 'react'
import { auth, firebase } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context'


const RegisterScreen = ({ navigation }) => {

  const userCollection = firebase.firestore().collection('users')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fullName, setFullName] = useState('')

  const handlePhoneNumberChange = (text) => {
    // Remove any non-digit characters from the input
    const formattedPhoneNumber = text.replace(/[^+0-9]/g, '');
    setPhoneNumber(formattedPhoneNumber);
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("AfterLogin")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
  auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        userCollection.doc(user.uid).set({
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          admin: false,
        });
        console.log('Registered in with:', user.email)
      })
      .catch(error => alert(error.message))
  }

  return (
    
    <ScrollView
      contentContainerStyle={styles.container}
    >

      <Image source={require('../assets/Autominusas.png')} style={styles.imageStyle}/>
      <View style={styles.inputContainer}>
        <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={text => setFullName(text)}
        placeholder="Vardas Pavardė"
        />
        <TextInput
        placeholder="El. Paštas"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        />
        <TextInput
        placeholder="Slaptažodis"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        />
        <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="phone-pad"
        placeholder="Telefono numeris"
        maxLength={12}
        />
      </View>
      <View style={styles.signUpTextContainer}>
        <Text>Jau užsiregistravęs? </Text>
        <Text style={styles.signUpText}
          onPress={() => navigation.navigate("Login")}>
          Prisijungti
        </Text>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Registruotis</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF4E0',
    },
    inputContainer: {
      width: '80%',
      marginTop: 150
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#B46060',
      width: '120%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    imageStyle: {
      width: 220,
      height: 220,
      position: 'absolute',
      top: 0,
      marginTop: 30
    },
    signUpTextContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      fontSize: 14,
      marginTop: 5
    },
    signUpText: {
      color: '#B46060',
      fontWeight: '700'
    }
})