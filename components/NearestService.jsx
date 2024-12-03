// app/screens/NearestService.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from './../constants/Colors';
import { useNavigation } from '@react-navigation/native';

export default function NearestService({ navigation }) {
  const stations = [
    'Auto Miraj Kottawa',
    'Auto Miraj Nugegoda',
    'Auto Miraj Matara',
    'Auto Miraj Galle',
    'Auto Miraj Colombo 7',
    'Auto Miraj Kalutara',
    'Auto Miraj Badulla',
  ];

  const handleStationPress = (station) => {
    // Navigate to AppointmentBooking screen with selected station
    navigation.navigate('AppointmentBooking', { selectedStation: station });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Find Your Nearest Service Station</Text>
        <View style={styles.stationsList}>
          {stations.map((station, index) => (
            <TouchableOpacity
              key={index}
              style={styles.stationItem}
              onPress={() => handleStationPress(station)}
            >
              <Image
                source={require('./../assets/images/AutoMiraj.png')}
                style={styles.image}
              />
              <Text style={styles.stationName}>{station}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: Colors.PRIMARY,
    flexGrow: 1,
    paddingBottom: 20,
    paddingTop: 27,
  },
  container: {
    paddingTop: 30,
    backgroundColor: Colors.PRIMARY,
    
  },
  heading: {
    fontFamily: 'mulish-bold',
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  stationsList: {
    borderTopEndRadius:25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
  },
  stationItem: {
    backgroundColor: '#f7f7f7',
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginLeft:10,
    marginRight:10,
  },
  stationName: {
    fontFamily: 'mulish-semibold',
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f7f7f7',
  },
});
