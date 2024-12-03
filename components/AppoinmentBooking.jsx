import React, { useState, useEffect } from 'react';
import { useFonts } from "expo-font";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from './../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppointmentBooking({ route }) {
  const { selectedStation } = route.params;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [branch, setBranch] = useState(selectedStation || '');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log('Fetched userId from AsyncStorage:', userId);
        if (!userId) {
          throw new Error('No user ID found in AsyncStorage');
        }
        const response = await fetch(`http://192.168.103.251:5000/api/getUserDetails/:userId`);
        const data = await response.json();

        if (response.ok) {
          setName(`${data.first_name} ${data.last_name}`);
          setMobile(data.mobile);
        } else {
          console.error('Error fetching user details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message || error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleSubmit = () => {
    const appointmentData = {
      name,
      mobile,
      vehicleType,
      vehicleNumber,
      serviceType,
      branch,
      date,
      time,
    };
    console.log('Appointment Data:', appointmentData);
    alert('Appointment booked successfully!');
  };

  useFonts({
    'mulish': require('./../assets/fonts/Mulish-Regular.ttf'),
    'mulish-medium': require('./../assets/fonts/Mulish-Medium.ttf'),
    'mulish-semibold': require('./../assets/fonts/Mulish-SemiBold.ttf'),
    'mulish-bold': require('./../assets/fonts/Mulish-Bold.ttf'),
    'mulish-black': require('./../assets/fonts/Mulish-Black.ttf')
  });

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Book an Appointment</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} editable={false} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} value={mobile} editable={false} />

        <Text style={styles.label}>Vehicle Type</Text>
        <Picker
          selectedValue={vehicleType}
          style={styles.input}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
        >
          <Picker.Item label="Select Vehicle Type" value="" />
          <Picker.Item label="Sedan" value="Sedan" />
          <Picker.Item label="SUV" value="SUV" />
          <Picker.Item label="HatchBack" value="HatchBack" />
          <Picker.Item label="Coupe" value="Coupe" />
        </Picker>

        <Text style={styles.label}>Vehicle Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />

        <Text style={styles.label}>Service Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Service Type"
          value={serviceType}
          onChangeText={setServiceType}
        />

        <Text style={styles.label}>Branch</Text>
        <Picker
          selectedValue={branch}
          style={styles.input}
          onValueChange={(itemValue) => setBranch(itemValue)}
        >
          <Picker.Item label="Select Branch" value="" />
          <Picker.Item label="Branch 1" value="Branch 1" />
          <Picker.Item label="Branch 2" value="Branch 2" />
          <Picker.Item label="Branch 3" value="Branch 3" />
        </Picker>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.input} onPress={() => setShowDatePicker(true)}>
          {date.toDateString()}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Time</Text>
        <Text style={styles.input} onPress={() => setShowTimePicker(true)}>
          {time.toLocaleTimeString()}
        </Text>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    // marginBottom:50,
  },
  container: {
    marginBottom: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontFamily: 'mulish-bold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'mulish-semibold',
    fontSize: 16,
    marginVertical: 5,
    color: Colors.PRIMARY,
  },
  input: {
    fontFamily: 'mulish-semibold',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'mulish-semibold',
    color: '#fff',
    fontSize: 18,
  },
});
