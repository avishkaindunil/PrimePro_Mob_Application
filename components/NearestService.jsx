// app/screens/NearestService.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from './../constants/Colors';

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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Find Your Nearest Service Station</Text>
        <View style={styles.stationsList}>
          {stations.map((station, index) => (
            <TouchableOpacity key={index} style={styles.stationItem}>
              <Image source={require('./../assets/images/carwash.gif')} style={styles.image} />
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
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    padding: 20,
  },
  heading: {
    fontFamily: 'mulish-bold',
    fontSize: 24,
    marginBottom: 20,
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
  stationsList: {
    marginTop: 10,
  },
  stationItem: {
    backgroundColor: '#f7f7f7',
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stationName: {
    fontFamily: 'mulish-semibold',
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f7f7f7',
  },
});
