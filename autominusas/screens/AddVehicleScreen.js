import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Button, Image, ScrollView  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../firebase'
import HeaderApp from '../components/Header'
import { Dropdown } from 'react-native-element-dropdown';
import { SelectCountry } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddVehicleScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const vehiclesCollection = firebase.firestore().collection('vehicles')
  // Set data
  const [make, setMake] = useState('');
  const [isMakeSelected, setMakeSelected] = useState(false);
  const [model, setModel] = useState('');
  const [isModelSelected, setModelSelected] = useState(false);
  const [yearMan, setYearMan] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [price, setPrice] = useState('');
  const [isPriceEntered, setPriceEntered] = useState(false);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [imageUris, setImageUris] = useState([]);

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
      allowsMultipleSelection: true, // Allow multiple image selection
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUris = result.assets.map(asset => asset.uri); // Access selected images from "assets" array
      setImageUris(selectedImageUris);
    }
  };

    // Render the list of selected images
    const renderImage = ({ item }) => (
      <Image source={{ uri: item }} style={{ width: 150, height: 150 }} />
    );


  // Data for dropdowns
  const makeList = [
    { label: 'BMW',
    value: 'BMW',
    image: {
        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png"
    }
    },
    { label: 'Audi',
    value: 'Audi',
    image: {
        uri: "https://freepngimg.com/thumb/audi/29748-2-audi-logo-with-transparent-background-thumb.png"
    }
    },
    { label: 'VW',
    value: 'VW',
    image: {
        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/2048px-Volkswagen_logo_2019.svg.png"
    }
    },
    { label: 'Mercedes-Benz',
    value: 'Mercedes-Benz',
    image: {
        uri: "https://companieslogo.com/img/orig/MBG.DE-da0d7ae5.png?t=1644327287"
    }
    },
  ];

  const bmwModels = [
    { label: "116", value: '116'},
    { label: "118", value: '118'},
    { label: "120", value: '120'},
    { label: "320", value: '320'},
    { label: "325", value: '325'},
    { label: "330", value: '330'},
    { label: "525", value: '525'},
    { label: "530", value: '530'},
    { label: "730", value: '730'},
    { label: "740", value: '740'},
    { label: "750", value: '750'},
  ];

  const audiModels = [
    { label: "A3", value: 'A3'},
    { label: "A4", value: 'A4'},
    { label: "A6", value: 'A6'},
    { label: "A8", value: 'A8'},
  ];

  const vwModels = [
    { label: 'Golf', value: 'Golf' },
    { label: 'Passat', value: 'Passat' },
    { label: 'Tiguan', value: 'Tiguan' },
    { label: 'Touran', value: 'Touran' },
  ];

  const mercedesModels = [
    { label: 'C-Class', value: 'C-Class' },
    { label: 'E-Class', value: 'E-Class' },
    { label: 'S-Class', value: 'S-Class' },
  ];

  const fuelTypes = [
    { label: 'Dyzelinas', value: 'Dyzelinas'},
    { label: 'Benzinas', value: 'Benzinas'},
    { label: 'Benzinas/Dujos', value: 'Benzinas/Dujos'},
    { label: 'Benzinas/Elektra', value: 'Benzinas/Elektra'},
    { label: 'Elektra', value: 'Elektra'},
  ]

  const bodyTypes = [
    { label: 'Sedanas', value: 'Sedanas'},
    { label: 'Universalas', value: 'Universalas'},
    { label: 'Kupė', value: 'Kupė'},
    { label: 'Hečbekas', value: 'Hečbekas'},
    { label: 'Kabrioletas', value: 'Kabrioletas'},
    { label: 'Vienatūris', value: 'Vienatūris'},
  ]

  const cities = [
    { label: "Vilnius", value: 'Vilnius'},
    { label: "Kaunas", value: 'Kaunas'},
    { label: "Klaipėda", value: 'Klaipėda'},
    { label: "Šiauliai", value: 'Šiauliai'},
    { label: "Panevėžys", value: 'Panevėžys'},
    { label: "Marijampolė", value: 'Marijampolė'},
    { label: "Utena", value: 'Utena'},
    { label: "Biržai", value: 'Biržai'},
    { label: "Kupiškis", value: 'Kupiškis'},
    { label: "Rokiškis", value: 'Rokiškis'},
    { label: "Jonava", value: 'Jonava'},
  ];

  const getModels = () => {
    let data;
    switch (make){
        case 'BMW':
            data = bmwModels;
            break;
        case 'Audi':
            data = audiModels;
            break;
        case 'VW':
            data = vwModels;
            break;
        case 'Mercedes-Benz':
            data = mercedesModels;
            break;
        default:
            data = [];
    }
    return data;
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = () => {
    const yearArray = [];
    for (let year = 1950; year <= currentYear; year++) {
      yearArray.push({ label: year.toString(), value: year.toString() });
    }
    return yearArray;
  };

  const makeSelected = () => {
    let disableModel;
    if(make === '') disableModel = true;
    else disableModel = false;
    return disableModel;
  }

  const uploadVehicle = async () => {
    if (imageUris.length > 0) {
      const imageUploadPromises = imageUris.map(async (uri, index) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const imageName = new Date().getTime() + index;
        const ref = firebase.storage().ref().child(`images/${imageName}`);
        await ref.put(blob);
        const downloadUrl = await ref.getDownloadURL();
        return downloadUrl;
      });

      Promise.all(imageUploadPromises)
        .then(downloadUrls => {
          const imageUrls = downloadUrls.map(url => ({ url }));
          return vehiclesCollection.add({ photos: imageUrls,
            make: make,
            model: model,
            yearMan: yearMan,
            fuelType: fuelType,
            gearbox: gearbox,
            bodyType: bodyType,
            price: price,
            description: description,
            user: `users/${user.uid}`,
            city: city
            // user: user.uid
          });
        })
        .then(() => {
          navigation.replace("AfterLogin", {screen: "Mano skelbimai"})
          console.log('Images uploaded successfully!');
        })
        .catch(error => {
          console.error('Failed to upload images:', error);
        });
    } else {
      alert('No images selected!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <HeaderApp></HeaderApp>
      </View>
      <View style={styles.dataContainer}>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
      <Text style={styles.textStyle}>Automobilio informacija:</Text>
      {/* Make dropdown */}
      <SelectCountry
        style={styles.input}
        data={makeList}
        value={make}
        onChange={item => {
          setMake(item.value);
          setMakeSelected(true);
        }}
        imageStyle={styles.imageStyle}
        labelField="label"
        valueField="value"
        imageField="image"
        placeholder="Markė"
        onConfirmSelectItem={console.log(make)}
      />
      {/* Model dropdown */}
      <Dropdown
        style={styles.input}
        data={getModels()}
        value={model}
        disable={makeSelected()}
        onChange={item => {
          setModel(item.value);
          setModelSelected(true);
        }}
        labelField="label"
        valueField="value"
        placeholder="Modelis"
        onConfirmSelectItem={console.log(model)}
      />
      {/* Year of manufacture dropdown */}
      <Dropdown
        style={styles.input}
        data={yearOptions()}
        value={yearMan}
        onChange={item => {
          setYearMan(item.value);
        }}
        labelField="label"
        valueField="value"
        placeholder="Pagaminimo metai"
        onConfirmSelectItem={console.log(yearMan)}
      />
      {/* Fuel type dropdown */}
      <Dropdown
        style={styles.input}
        data={fuelTypes}
        value={fuelType}
        onChange={item => {
          setFuelType(item.value);
        }}
        labelField="label"
        valueField="value"
        placeholder="Kuro tipas"
        onConfirmSelectItem={console.log(fuelType)}
      />
      {/* Gearbox dropdown */}
      <Dropdown
        style={styles.input}
        data={[{label: 'Mechaninė', value: 'Mechaninė'},
        {label: 'Automatinė', value: 'Automatinė'}
      ]}
        value={gearbox}
        onChange={item => {
          setGearbox(item.value);
        }}
        labelField="label"
        valueField="value"
        placeholder="Pavarų dėžė"
        onConfirmSelectItem={console.log(gearbox)}
      />
      {/* Body type dropdown */}
      <Dropdown
        style={styles.input}
        data={bodyTypes}
        value={bodyType}
        onChange={item => {
          setBodyType(item.value);
        }}
        labelField="label"
        valueField="value"
        placeholder="Kėbulo tipas"
        onConfirmSelectItem={console.log(bodyType)}
      />
        {/* City dropdown */}
        <Dropdown
        style={styles.input}
        data={cities}
        value={cities}
        onChange={item => {
          setCity(item.value);
        }}
        labelField="label"
        valueField="value"
        placeholder="Miestas"
        onConfirmSelectItem={console.log(bodyType)}
      />
      <Text style={styles.textStyle}>Aprašymas:</Text>
      <TextInput
        placeholder="Kaina"
        keyboardType='numeric'
        value={price}
        onChangeText={text => {
          setPrice(text);
          setPriceEntered(true);
        }}
        style={styles.input}
      />
      <TextInput
        multiline
        placeholder="Aprašymas"
        value={description}
        onChangeText={text => setDescription(text)}
        style={[styles.input, styles.descriptionStyle]}
      />
      <TouchableOpacity style={styles.button} onPress={pickImages}><Text style={styles.buttonText}>Pridėti nuotraukų</Text></TouchableOpacity>
        {imageUris.length > 0 && (
          <FlatList
            data={imageUris}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            numColumns={2}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={uploadVehicle}><Text style={styles.buttonText}>Įkelti skelbimą</Text></TouchableOpacity>
      </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AddVehicleScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF4E0'
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
  scrollStyle: {
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
    width: '80%',
    height: 50,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  textStyle: {
    color: '#black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },
  descriptionStyle: {
    height: 200,
  },
  button: {
    backgroundColor: '#B46060',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

})