import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../firebase'
import HeaderApp from '../components/Header'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

const MyVehiclesScreen = ({ navigation }) => {
    const [vehicles, setVehicles] = useState([]);
    const vehiclesCollection = firebase.firestore().collection('vehicles')
    const user = auth.currentUser
    const prevScreen = useRoute().name

    useEffect(() => {
      
        // Function to retrieve all documents from "users" collection
        const getAllVehicles = async () => {
          try {
            const snapshot = await vehiclesCollection.where('user', '==', `users/${user.uid}`).get();
            if (!snapshot.empty) {
              const vehiclesData = snapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
              });
              setVehicles(vehiclesData);
            } else {
                console.log('No documents found.');
              }
          } catch (error) {
            console.error('Error retrieving documents:', error);
          }
        }
    
        // Call the function to retrieve documents
        getAllVehicles();
      }, []);

      const deleteDocument = async (documentId) => {
        try {
          await vehiclesCollection.doc(documentId).delete();
          console.log('Document deleted successfully.');
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <HeaderApp></HeaderApp>
        </View>
        {(vehicles.length)==0?
        <View style={styles.noVehicles}>
          <Text style={styles.noVehiclesText}>Skelbimų nerasta</Text>
          <TouchableOpacity style={styles.noVehiclesButton} onPress={() => {navigation.navigate("Įkelti skelbimą")}}>
            <Text style={styles.noVehiclesButtonText}>Įkelti skelbimą</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={styles.dataContainer}>
        <ScrollView contentContainerStyle={styles.scrollStyle}>
            {vehicles.map(vehicle => (
                <Card key={vehicle.id} style={styles.card} onPress={() => {
                  navigation.replace("VehicleScreen", { data: vehicle, prevScreen: prevScreen})
                }}>
                    <Card.Actions>
                      <Button style={styles.cardBtn} icon="delete" mode="contained" onPress={() => {
                        deleteDocument(vehicle.id)
                      }}>Ištrinti</Button>
                    </Card.Actions>
                    <Card.Content>
                        <Title style={styles.cardTitle}>{vehicle.make} {vehicle.model}</Title>
                        <Paragraph style={styles.cardParagraph}>{vehicle.price} €</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: vehicle.photos[0].url }}/>
                </Card>
            ))}
        </ScrollView>
        </View>
        }
    </SafeAreaView>
  )
}

export default MyVehiclesScreen

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
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
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
        // justifyContent: 'flex-start',
        // alignItems: 'center',
      },
      card: {
        marginVertical: 8,
        width: '90%',
        backgroundColor: '#ECCDB4',
      },
      cardTitle: {
        fontWeight: '500'
      },
      cardParagraph: {
        fontWeight: '450',
        fontSize: 18,
      },
      scrollStyle: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      noVehicles: {
        flex: 13,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      noVehiclesText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
      },
      noVehiclesButton: {
        backgroundColor: '#B46060',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
      },
      noVehiclesButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      cardBtn: {
        backgroundColor: '#4D4D4D',
      }

})