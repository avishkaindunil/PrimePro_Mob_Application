import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CustomRatingsFeedback() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const handleFeedbackSubmit = () => {
    if (feedback.trim() && rating > 0) {
      Alert.alert('Thank you!', 'Your feedback has been submitted successfully.');
      setFeedback('');
      setRating(0);
    } else {
      Alert.alert('Incomplete Submission', 'Please provide both feedback and a rating.');
    }
  };

  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)} style={styles.star}>
          <Ionicons
            name={index < rating ? 'star' : 'star-outline'}
            size={40}
            color={index < rating ? '#FFD700' : '#E0E0E0'}
          />
        </TouchableOpacity>
      ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>Custom Ratings & Feedback</Text>

      {/* Rating Section */}
      <Text style={styles.subHeader}>Rate your experience</Text>
      <View style={styles.ratingContainer}>{renderStars()}</View>

      {/* Feedback Section */}
      <Text style={styles.subHeader}>Share your feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        placeholderTextColor="#AAA"
        multiline
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Mulish-Bold',
    color: '#050C9C',
    textAlign: 'center',
    marginBottom: 30,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#050C9C',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
