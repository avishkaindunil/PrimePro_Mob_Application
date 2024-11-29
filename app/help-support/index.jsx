import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpAndSupport() {
  const [message, setMessage] = useState('');

  const handleInquirySubmit = () => {
    if (message.trim()) {
      console.log('Inquiry submitted:', message);
      setMessage('');
      alert('Your inquiry has been submitted!');
    } else {
      alert('Please enter a message before submitting.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="help-circle-outline" size={28} color="#fff" />
        <Text style={styles.header}>Help and Support</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subHeader}>Chat with our support assistant:</Text>
        <View style={styles.chatContainer}>
          <View style={styles.assistantMessage}>
            <Text style={styles.chatText}>
              Hello! How can I assist you today?
            </Text>
          </View>
        </View>

        <Text style={styles.subHeader}>Submit Your Inquiry:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#aaa"
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleInquirySubmit}>
          <Text style={styles.submitText}>Submit Inquiry</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FC',
  },
  headerContainer: {
    backgroundColor: '#050C9C',
    paddingBottom: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold', // Use Mulish-Bold font
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'mulish-regular', // Use Mulish-Regular font
    marginBottom: 10,
  },
  chatContainer: {
    marginBottom: 20,
  },
  assistantMessage: {
    backgroundColor: '#E8F0FE',
    padding: 15,
    borderRadius: 12,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  chatText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'mulish-regular', // Use Mulish-Regular font
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
    fontFamily: 'mulish-regular', // Use Mulish-Regular font
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#050C9C',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'mulish-bold', // Use Mulish-Bold font
  },
});
