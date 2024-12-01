import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {useroute} from '@react-navigation/native';
import styles from '../Styles';

export default function ViewTask({route, navigation})
{
  const task = route.params.task;

  return(
    <View style={styles.conatiner}>
    <Text style = {styles.title}> View Contact Details</Text>
    <Text style= {styles.taskField}>
    {"\n"}ID: <Text style={styles.taskText}>{task.id}</Text>
    </Text>
    <Text style= {styles.taskField}>
    Name: <Text style={styles.taskText}>{task.name}</Text>
    </Text>
    <Text style= {styles.taskField}>
    Phone: <Text style={styles.taskText}>{task.phone}</Text>
    </Text>

    <View style={styles.imageContainer}>
    <Image
    source = {require('../assets/boardRoom-unsplash.jpg')}
    style = {styles.image}
  />
  </View>
  </View>
  );

}