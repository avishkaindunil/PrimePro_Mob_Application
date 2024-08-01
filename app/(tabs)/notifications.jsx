import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function notifications() {
  return (
    <>
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>Notifications</Text>
    </View>
    <View style={styles.mainContainerTwo}>
      <Text style={styles.mainTextTwo}>No notification(s) to show.</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: '#fff',
  },

  mainText:{
    fontFamily: 'mulish-bold',
    fontSize: 30,
    paddingTop: 70,
    paddingBottom: 50,
    paddingLeft: 20,
  },

  mainContainerTwo:{
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },

  mainTextTwo:{
    fontFamily: 'mulish-semibold',
    fontSize: 22,
    color: '#888',
  },
});