import React, { useState, useEffect } from 'react';
import { Colors } from './../constants/Colors';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';

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
  
    const handleSubmit = async () => {
      const appointmentData = {
        name,
        mobile,
        vehicleType,
        vehicleNumber,
        serviceType,
        branch,
        date: date.toISOString().split('T')[0],
        time: time.toTimeString().split(' ')[0],
      };
  
      try {
        const response = await fetch('http://192.168.121.251:5000/api/book-appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointmentData),
        });
  
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Booking successful:', data);
  
        if (data.appointmentId) {
          Alert.alert('Success', 'Booking successful!');
          setName('');
          setMobile('');
          setVehicleType('');
          setVehicleNumber('');
          setServiceType('');
          setBranch(selectedStation || '');
          setDate(new Date());
          setTime(new Date());
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
      <Text style={styles.title}>Book an Appointment</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        value={mobile}
        onChangeText={setMobile}
      />

      <Text style={styles.label}>Vehicle Type</Text>
      <Picker selectedValue={vehicleType} style={styles.input} onValueChange={setVehicleType}>
        <Picker.Item label="Select Vehicle Type" value="" />
        <Picker.Item label="Sedan" value="Sedan" />
        <Picker.Item label="SUV" value="SUV" />
        <Picker.Item label="HatchBack" value="HatchBack" />
        <Picker.Item label="Coupe" value="Coupe" />
        <Picker.Item label="Truck" value="Truck" />
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
      <Picker selectedValue={branch} style={styles.input} onValueChange={setBranch}>
        <Picker.Item label="Select Branch" value="" />
        <Picker.Item label="Auto Miraj Kottawa" value="Auto Miraj Kottawa" />
        <Picker.Item label="Auto Miraj Nugegoda" value="BAuto Miraj Nugegoda" />
        <Picker.Item label="Auto Miraj Matara" value="Auto Miraj Matara" />
        <Picker.Item label="Auto Miraj Galle" value="Auto Miraj Galle" />
        <Picker.Item label="Auto Miraj Colombo 7" value="Auto Miraj Colombo 7" />
        <Picker.Item label="Auto Miraj Kalutara" value="Auto Miraj Kalutara" />
        <Picker.Item label="Auto Miraj Badulla" value="Auto Miraj Badulla" />
      </Picker>

      <Text style={styles.label}>Date</Text>
      <Text style={styles.input} onPress={() => setShowDatePicker(true)}>
        {date.toDateString()}
      </Text>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}

      <Text style={styles.label}>Time</Text>
      <Text style={styles.input} onPress={() => setShowTimePicker(true)}>
        {time.toTimeString().split(' ')[0]}
      </Text>
      {showTimePicker && (
        <DateTimePicker value={time} mode="time" display="default" onChange={handleTimeChange} />
      )}

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Book Appointment</Text>
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
    paddingBottom:70,
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
  value:{
    fontFamily: 'mulish-semibold',
    fontSize: 16,
    marginVertical: 5,
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
