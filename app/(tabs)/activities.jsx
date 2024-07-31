import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';

const tabs = [
  { id: 'ongoing', title: 'Ongoing' },
  { id: 'completed', title: 'Completed' },
  { id: 'complaints', title: 'Complaints' },
  { id: 'cancelled', title: 'Cancelled' },
];

export default function Activities() {
  const [selectedTab, setSelectedTab] = useState('ongoing');

  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tab,
        item.id === selectedTab ? styles.activeTab : styles.inactiveTab,
      ]}
      onPress={() => setSelectedTab(item.id)}
    >
      <Text
        style={[
          styles.tabText,
          item.id === selectedTab ? styles.activeTabText : styles.inactiveTabText,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.yourActivities}>Your Activities</Text>
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        />
        <View style={styles.contentContainer}>
          {selectedTab === 'ongoing' && <Text style={styles.content}>
            <View style={styles.carWashContainerOne}>
              <View style={styles.carWashContainerLeft}>
                <Image source={require('./../../assets/images/car-wash-icon.png')} 
                style={styles.carWashIcon} />
                <View>
                  <Text style={styles.carWashHeading}>Car Wash</Text>
                  <Text style={styles.carWashText}>Avishka 704951749</Text>
                </View>
                
              </View>
              
              <View>
                <Text style={styles.carWashHeadingTwo}>01 August 2024</Text>
                <Text style={styles.carWashHeadingTwo}>09.09AM</Text>
              </View>
            </View>
            
          </Text>}
          {selectedTab === 'completed' && <Text style={styles.content}>Content for Completed</Text>}
          {selectedTab === 'complaints' && <Text style={styles.content}>Content for Complaints</Text>}
          {selectedTab === 'cancelled' && <Text style={styles.content}>Content for Cancelled</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  yourActivities: {
    fontFamily: 'mulish-bold',
    fontSize: 30,
    marginLeft: 15,
    paddingTop: 30,
  },
  tabsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#050C9C',
  },
  inactiveTab: {
    backgroundColor: '#3572EF',
  },
  tabText: {
    fontFamily: 'mulish-semibold',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
  },
  inactiveTabText: {
    color: '#fff',
  },
  contentContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f7f7f7',
    // width: '100%',
    borderRadius: 10,
  },
  content: {
    fontFamily: 'mulish-medium',
    fontSize: 16,
  },

  carWashContainerOne:{
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    // flexWrap: 'wrap', // Allow items to wrap to the next line
    // justifyContent: 'space-around', // Distribute space evenly
    gap: 7,
    padding: 12,
    alignItems: 'center',
  },

  carWashContainerLeft:{
    display: 'flex',
    flexDirection: 'row', // Align items in a row
    // flexWrap: 'wrap', // Allow items to wrap to the next line
    // justifyContent: 'space-around', // Distribute space evenly
    gap: 7,
    padding: 12,
    alignItems: 'center',
  },

  carWashIcon:{
    width: 32,
    height: 32,
    alignItems: 'center',
  },

  carWashHeading:{
    fontFamily: 'mulish-bold',
    fontSize:18,
    paddingLeft: 7,
  },

  carWashHeadingTwo:{
    fontFamily: 'mulish-bold',
    fontSize:16,
    paddingLeft: 7,
  },

  carWashText:{
    fontFamily: 'mulish-medium',
    fontSize:14,
    color: '#888',
    paddingLeft: 10,
  },
  
});
