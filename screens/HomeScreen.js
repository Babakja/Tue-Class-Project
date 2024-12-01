import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Welcome to ROI Staff Directory</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TaskList')}>
        <Text style={styles.buttonText}>Go To Staff Contacts</Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
