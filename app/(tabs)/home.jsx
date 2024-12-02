import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from './../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        console.log('Fetched Email:', email);
        if (email) {
          const response = await axios.post('http://192.168.103.251:5000/api/getUser', { email });
          console.log('User Data:', response.data);
          if (response.data && response.data.firstName) {
            setFirstName(response.data.firstName);
          } else {
            console.error('First name not found');
          }
        } else {
          console.error('No email found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        return 'Good Morning';
      } else if (hour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };

    setGreeting(getGreeting());
    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.hi}>Hi 👋</Text>
        <Text style={styles.homes}>{greeting}, {firstName} 😀</Text>
      </View>
      <View style={styles.mainContentContainer}>
        <View style={styles.contentContainermainone}>
        <TouchableOpacity onPress={() => navigation.navigate('NearestService')}>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/carwash.gif')} style={styles.image} />
            <Text style={styles.wash}>Wash Car</Text>
          </View>
        </TouchableOpacity>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/caroil.gif')} style={styles.image} />
            <Text style={styles.wash}>Oil Change</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/tyre.gif')} style={styles.image} />
            <Text style={styles.wash}>Tire Cleaning</Text>
          </View>
        </View>
        <View style={styles.contentContainermaintwo}>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/fullbattery.gif')} style={styles.image} />
            <Text style={styles.wash}>Battery Rep.</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/engine.gif')} style={styles.image} />
            <Text style={styles.wash}>Engine Rep.</Text>
          </View>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/chassis.gif')} style={styles.image} />
            <Text style={styles.wash}>Chassis Rep.</Text>
          </View>
        </View>
        <View style={styles.contentContainermainthree}>
          <View style={styles.itemContainer}>
            <Image source={require('./../../assets/images/ac.gif')} style={styles.image} />
            <Text style={styles.wash}>Air Filter Rep.</Text>
          </View>
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
  mainContentContainer:{
    
  },
  contentContainermainone: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-around', // Distribute space evenly
    gap: 7,
    padding: 12,
    paddingTop: 20,
  },
  contentContainermaintwo:{
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    justifyContent: 'space-around', // Distribute space evenly
    gap: 7,
    padding: 12,
  },
  contentContainermainthree:{
    backgroundColor: '#fff',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding:12,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 20,
    height:115,
    width:115,
    borderColor:Colors.PRIMARY,
    borderWidth:2,
    borderRadius:10,
    padding:15,
  },
  image: {
    backgroundColor: '#f7f7f7',
    width: 72,
    height: 50,
    borderRadius: 20,
  },
  imageServices: {
    backgroundColor: '#f7f7f7',
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  imageQr: {
    backgroundColor: '#f7f7f7',
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  wash: {
    fontFamily: 'mulish-semibold',
    fontSize: 16,
    marginTop: 15,
    textAlign:'center',
    color: Colors.PRIMARY,
  },
  contentContainerTwo: {
    marginTop: -30,
    backgroundColor: '#fff',
    padding: 12,
    paddingTop: 20,
  },
  find: {
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
    marginTop: 20,
    width: '93%', // Adjust the width as needed
    alignSelf: 'center',
    backgroundColor: '#f7f7f7',
    fontFamily: 'mulish-semibold',
    fontSize: 20,
  },
  contentContainerTwoSub: {
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    gap: 12,
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
  },
  mapLocator: {
    width: 34,
    height: 34,
  },
  contentContainerThreeSub: {
    backgroundColor: '#f7f7f7',
    paddingTop: 15,
    borderRadius: 20,
    paddingBottom: 10,
  },
  coverImage: {
    width: 340,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'mulish-semibold',
    fontSize: 16,
  },
});
