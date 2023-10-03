import { StyleSheet, Text, TouchableOpacity, View, ScrollView , Image, Dimensions} from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../firebase'
import HeaderApp from '../components/Header'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwiperFlatList } from 'react-native-swiper-flatlist';


const VehicleScreen = ({ navigation, route }) => {
    const [seller, setSeller] = useState('');
    const vehicle = route.params.data;
    const prevScreen = route.params.prevScreen;
    const user = auth.currentUser;

    console.log()
    //const usersCollection = firebase.firestore().collection('users')
    // firebase.firestore().doc(vehicle.user).get()
    // .then(doc => {
    //     userData = doc.data();
    //     fullName = userData.fullName;
    //     imageURL = userData.imageURL;
    //     if(imageURL === undefined) imageURL = 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
    //     console.log(imageURL)
    //   })
    //   .catch(error => {
    //     console.log('Error getting document: ', error);
    //   }); 
      
      // Call the function with the document ID


        const getSellerData = async (documentId) => {
          try {
            const documentRef = firebase.firestore().doc(documentId);
            const documentSnapshot = await documentRef.get();
    
            if (documentSnapshot.exists) {
              const documentData = documentSnapshot.data();
              setSeller(documentData);
            } else {
              console.log('Document does not exist');
            }
          } catch (error) {
            console.error('Error getting document:', error);
          }
        };
    
        getSellerData(vehicle.user)

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
        <HeaderApp prevScreen={prevScreen}></HeaderApp>
    </View>
    <View style={styles.dataContainer}>
    <ScrollView contentContainerStyle={styles.scrollStyle}>
            <Card key={vehicle.uid} style={styles.card} mode='elevated'>
                {vehicle.user === "users/" + user.uid 
                ? (<Card.Actions>
                  <Button style={styles.cardBtn} icon="account-edit" mode="contained">Redaguoti</Button>
                </Card.Actions>) : <Text></Text>
                } 
                <Card.Content>
                    <View style={styles.swiperContainer}>
                    <SwiperFlatList
                        autoplay
                        autoplayDelay={5}
                        autoplayLoop
                        index={0}
                        showPagination
                        data={vehicle.photos}
                        renderItem={({ item }) => (
                            <View style={styles.swiperGallery}>
                            <Image style={styles.imageStyle} source={{ uri: item.url }}></Image>
                            </View>
                        )}
                    />
                    </View>
                    <Title style={styles.cardTitle}>{vehicle.price} €</Title>
                    <Text style={styles.cardTitle}>Automobilio informacija:</Text>
                    <View style={[styles.infoView, styles.vehicleInfo]}>
                      <View style={styles.infoLabel}>
                        <Paragraph style={styles.infoTitle}>Markė:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Modelis:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Pagaminimo data:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Kuro tipas:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Pavarų dėžė:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Kėbulo tipas:</Paragraph>
                      </View>
                      <View style={styles.infoData}>
                        <Paragraph style={styles.cardParagraph}>{vehicle.make}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{vehicle.model}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{vehicle.yearMan}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{vehicle.fuelType}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{vehicle.gearbox}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{vehicle.bodyType}</Paragraph>
                      </View>
                    </View>
                    <Text style={styles.cardTitle}>Aprašymas:</Text>
                    <View style={styles.infoView}>
                      <Paragraph style={styles.cardParagraph}>{vehicle.description}</Paragraph>
                    </View>
                    <Text style={styles.cardTitle}>Pardavėjo informacija:</Text>
                    <View style={[styles.infoView, styles.vehicleInfo]}>
                      <View style={styles.infoLabel}>
                        <Paragraph style={styles.infoTitle}>Vardas:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Tel. Numeris:</Paragraph>
                        <Paragraph style={styles.infoTitle}>Miestas:</Paragraph>
                      </View>
                      <View style={styles.infoData}>
                        <Paragraph style={styles.cardParagraph}>{seller.fullName}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{seller.phoneNumber}</Paragraph>
                        <Paragraph style={styles.cardParagraph}>{vehicle.city}</Paragraph>
                      </View>
                    </View>

                </Card.Content>
            </Card>
    </ScrollView>
    </View>
</SafeAreaView>
  )
}

export default VehicleScreen
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
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
      },
      card: {
        marginVertical: 8,
        width: '100%',
        backgroundColor: '#ECCDB4',
      },
      cardTitle: {
        fontWeight: '500',
        fontSize: 22
      },
      cardParagraph: {
        fontWeight: '450',
        fontSize: 16,
        color: 'black'
      },
      cardButton: {
        alignItems: 'center'
      },
      scrollStyle: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'center'
      },
      swiperGallery: {
        justifyContent: 'center',
        width,
        height: height / 2,
      },
      swiperContainer: {
        justifyContent: 'center',
        flex: 1
      },
      infoView: {
        backgroundColor: '#FFF4E0',
        borderRadius: 10,
        marginTop: 10,
        padding: 10
      },
      vehicleInfo: {
        flexDirection: 'row'
      },
      infoLabel: {
        flex: 1,
      },
      infoData: {
        flex: 1,
      },
      infoTitle: {
        fontWeight: '500',
        fontSize: 16,
        color: 'black'
      },
      cardBtn: {
        backgroundColor: '#4D4D4D'
      }
})