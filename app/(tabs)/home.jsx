import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from './../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.hi}>Hi 👋</Text>
        <Text style={styles.homes}>Good Morning, Avishka Indunil</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          <Image source={require('./../../assets/images/car-small.png')}
            style={styles.image} />
          <Text style={styles.wash}>Wash Car</Text>
        </View>
        <View style={styles.itemContainer}>
          <Image source={require('./../../assets/images/service.png')}
            style={styles.imageServices} />
          <Text style={styles.wash}>Services</Text>
        </View>
        <View style={styles.itemContainer}>
          <Image source={require('./../../assets/images/qrcode.png')}
            style={styles.imageQr} />
          <Text style={styles.wash}>Scan 'N' Go</Text>
        </View>
      </View>
      <View style={styles.contentContainerTwo}>
        <Text style={styles.find}>Where is the nearest service center?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location! "
          placeholderTextColor="#888"
        />
        <View style={styles.contentContainerTwoSub}>
            <Image source={require('./../../assets/images/map-locator.png')}
            style={styles.mapLocator} />
            <View>
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'mulish-semibold'
                
                }}>University of Colombo</Text>
                <Text style={{
                    fontSize: 12,
                    fontFamily: 'mulish-medium',
                    color: '#888',
                }}>Cumaratunga Munidasa Mw Colombo 03. Sri Lanka</Text>
            </View>
            
        </View>
        <View style={styles.contentContainerThreeSub}>
            <Image source={require('./../../assets/images/cover-image.jpg')}
            style={styles.coverImage} />
            <Text style={{
                fontSize: 20,
                fontFamily: 'mulish-bold',
                marginLeft: 18,
                paddingTop: 10,
            }}>PrimePro, now Delivering Happiness!</Text>
            <Text style={{
                fontSize: 14,
                fontFamily: 'mulish-medium',
                marginLeft: 18,
                paddingTop: 10,
                color: '#888',
                lineHeight: 20,
            }}>PrimePro connects you with the best car wash and vehicle services. Easily find, book, and manage services for a hassle-free car care experience.</Text>
            <TouchableOpacity style={styles.button}>
                <LinearGradient
                    colors={['#050C9C', '#3572EF']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Read More</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        <View style={styles.contentContainerThreeSub}>
            <Image source={require('./../../assets/images/cover-image-two.jpg')}
            style={styles.coverImage} />
            <Text style={{
                fontSize: 20,
                fontFamily: 'mulish-bold',
                marginLeft: 18,
                paddingTop: 10,
            }}>PrimePro, now Delivering Happiness!</Text>
            <Text style={{
                fontSize: 14,
                fontFamily: 'mulish-medium',
                marginLeft: 18,
                paddingTop: 10,
                color: '#888',
                lineHeight: 20,
            }}>PrimePro connects you with the best car wash and vehicle services. Easily find, book, and manage services for a hassle-free car care experience.</Text>
            <TouchableOpacity style={styles.button}>
                <LinearGradient
                    colors={['#050C9C', '#3572EF']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Read More</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
scrollViewContent: {
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
    paddingBottom: 40,
    paddingTop: 30,
  },
  hi: {
    fontFamily: 'mulish-semibold',
    fontSize: 20,
    color: '#fff',
    marginLeft: 50,
    marginRight: 266,
    marginTop: 40,
    backgroundColor: '#050C9C',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
  },
  homes: {
    fontFamily: 'mulish-semibold',
    fontSize: 20,
    marginLeft: 43,
    color: '#fff',
    backgroundColor: Colors.PRIMARY,
    padding: 12,
  },
  contentContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    // flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'space-around', // Distribute space evenly
    gap: 7,
    padding: 12,
    paddingTop: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    backgroundColor: '#f7f7f7',
    width: 101,
    height: 70,
    borderRadius: 20,
  },
  imageServices:{
    backgroundColor: '#f7f7f7',
    width: 72,
    height:72,
    borderRadius:10,
  },
  imageQr:{
    backgroundColor: '#f7f7f7',
    width: 72,
    height:72,
    borderRadius:10,
  },
  wash: {
    fontFamily: 'mulish-semibold',
    fontSize: 14,
    marginTop: 10,
    color:'gray',
  },
  contentContainerTwo:{
    marginTop: -30,
    backgroundColor: '#fff',
    // display: 'flex',
    // flexDirection: 'row', // Align items in a row
    // // flexWrap: 'wrap', // Allow items to wrap to the next line
    // justifyContent: 'space-around', // Distribute space evenly
    // gap: 7,
    padding: 12,
    paddingTop: 20,
  },

  find:{
    marginLeft: 12,
    fontSize: 20,
    fontFamily: 'mulish-bold',
  },

  input: {
    height: 54,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop:20,
    width: '93%', // Adjust the width as needed
    alignSelf: 'center',
    backgroundColor: '#f7f7f7',
    fontFamily: 'mulish-semibold',
    fontSize: 20,
  },

  contentContainerTwoSub:{
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    // flexWrap: 'wrap', // Allow items to wrap to the next line
    // justifyContent: 'space-around', // Distribute space evenly
    gap: 12,
    alignItems: 'center',
    // alignSelf:'center'
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1, 
  },

  mapLocator:{
    width: 34,
    height: 34,
  },

  contentContainerThreeSub:{
    backgroundColor: '#f7f7f7',
    paddingTop: 15,
    borderRadius: 20,
    paddingBottom: 10,
  },

  coverImage: {
    width: 340,
    height: 200,
    borderRadius: 20,
    // borderTopRightRadius: 20,
    alignSelf: 'center',
  },

  button: {
    borderRadius: 20,
    overflow: 'hidden', // Ensure gradient does not overflow the button's border
    margin: 10,
    width: '100%',
    alignItems:'center',
    alignSelf: 'center',
  },
  gradient: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'mulish-semibold',
    fontSize: 18,
    color: '#fff',
  },
});
