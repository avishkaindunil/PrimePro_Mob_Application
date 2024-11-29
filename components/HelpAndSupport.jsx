import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
    <LinearGradient colors={['#050C9C', '#00BFFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Ionicons name="help-circle-outline" size={36} color="#fff" />
          <Text style={styles.headerText}>Help and Support</Text>
        </View>

        {/* Chat Assistant */}
        <View style={styles.card}>
          <View style={styles.chatBubble}>
            <MaterialCommunityIcons name="robot-happy-outline" size={24} color="#050C9C" />
            <Text style={styles.chatText}>Hi! How can I assist you today?</Text>
          </View>
        </View>

        {/* Inquiry Section */}
        <View style={styles.card}>
          <Text style={styles.subHeader}>Submit Your Inquiry</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor="#aaa"
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleInquirySubmit}>
            <LinearGradient
              colors={['#050C9C', '#00BFFF']}
              style={styles.gradientButton}
            >
              <Text style={styles.submitText}>Submit Inquiry</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  chatBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    padding: 15,
    borderRadius: 12,
  },
  chatText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 12,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
