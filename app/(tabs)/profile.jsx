import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

export default function profile() {
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.mainText}>Avishka Indunil</Text>
            <Text style={styles.hi}>Blue Member</Text>
          </View>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Text style={styles.profilePlaceholderText}>+</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainContainerTwo}>
        <Octicons name="people" size={24} color="black" />
        <Text style={styles.mainTextTwo}>For a Friend</Text>
      </View>
      <View style={styles.mainContainerThree}>
        <MaterialIcons name="card-membership" size={24} color="black" />
        <Text style={styles.mainTextTwo}>Membership</Text>
      </View>
      <View style={styles.mainContainerThree}>
        <MaterialIcons name="support-agent" size={24} color="black" />
        <Text style={styles.mainTextTwo}>Help and Support</Text>
      </View>
      <View style={styles.mainContainerThree}>
        <MaterialCommunityIcons name="gas-station-outline" size={24} color="black" />
        <Text style={styles.mainTextTwo}>Earn with PrimePro</Text>
      </View>
      <View style={styles.mainContainerThree}>
        <MaterialIcons name="payment" size={24} color="black" />
        <Text style={styles.mainTextTwo}>Payment</Text>
      </View>
      <View style={styles.mainContainerThree}>
        <Feather name="help-circle" size={24} color="black" />
        <Text style={styles.mainTextTwo}>About Us</Text>
      </View>
      <View>
        <Text style={styles.madeInLK}>Made in Sri Lanka 🇱🇰🚀</Text>
        <Text style={styles.appVersion}>App version 1.0</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 30,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  mainText: {
    fontFamily: 'mulish-bold',
    fontSize: 30,
  },
  hi: {
    fontFamily: 'mulish-semibold',
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#050C9C',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginTop: 10,
    marginRight: 100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText: {
    fontSize: 36,
    color: '#888',
  },
  mainContainerTwo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 15,
  },
  mainContainerThree: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    paddingLeft: 20,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 7,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 15,
  },
  mainTextTwo: {
    fontFamily: 'mulish-bold',
    fontSize: 22,
    color: '#000',
  },
  madeInLK: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'mulish-medium',
    fontSize: 14,
  },
  appVersion: {
    marginLeft: 20,
    marginTop: 3,
    fontFamily: 'mulish-medium',
    fontSize: 14,
    color: '#888',
  },
});

