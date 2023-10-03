import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Linking } from 'react-native'
import React, { useEffect, useState} from 'react'
import { auth, firebase } from '../firebase'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("AfterLogin");
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email)
      })
      .catch(error => alert(error.message))
  }

  return (
    
    <SafeAreaView
      style={styles.container}
    >
      <Image source={require('../assets/Autominusas.png')} style={styles.imageStyle}/>
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.signUpTextContainer}>
          <Text>Dar neturi paskyros? </Text>
          <Text style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}>
            Registruotis
        </Text>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Prisijungti</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF4E0'
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