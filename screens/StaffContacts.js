import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import alert from '../alert';
import styles from '../Styles';

export default function StaffContacts({ navigation }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZIP] = useState('');
  const [country, setCountry] = useState('');


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving Tasks:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleAddTask = () => {
    /* Validation - check if all fields are filled*/
    if (
      id.trim() !== '' &&
      name.trim() !== '' &&
      phone.trim() !== '' &&
      department.trim() !== '' &&
      street.trim() !== '' &&
      city.trim() !== '' &&
      state.trim() !== '' &&
      zip.trim() !== '' &&
      country.trim() !== ''
    ) {
      const newTask = {
        id,
        name,
        phone,
        department,
        street,
        city,
        state,
        zip,
        country
      };

      const newTasks = tasks.concat(newTask);
      setTasks(newTasks);
      saveTasks(newTasks);

      /* Reset form fields*/
      setId('');
      setName('');
      setPhone('');
      setDepartment('');
      setStreet('');
      setCity('');
      setState('');
      setZIP('');
      setCountry('');

      alert('Success', 'Task has been added successfully.');
    } else {
      return alert('Missing Fields', 'Please fill out all the fields.');
    }
  };

  const viewTaskHandler = (task) => {
    navigation.navigate('ViewContact', { task });
  };

  const deleteTask = (index) => {
    let updatedTasks = tasks.concat();
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteHandler = (index) => {
    return alert(
      'Delete Task',
      'Are you sure you want to delete ' + tasks[index].name + '?',
      [
        {
          text: 'Yes',
          onPress: () => deleteTask(index),
        },
        {
          text: 'No',
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Staff Contacts</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter ID"
          placeholderTextColor="#D9D9D9"
          value={id}
          onChangeText={(text) => setId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#D9D9D9"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Phone"
          placeholderTextColor="#D9D9D9"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Department"
          placeholderTextColor="#D9D9D9"
          value={department}
          onChangeText={(text) => setDepartment(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address: Street"
          placeholderTextColor="#D9D9D9"
          value={street}
          onChangeText={(text) => setStreet(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address: City"
          placeholderTextColor="#D9D9D9"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address: State"
          placeholderTextColor="#D9D9D9"
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address: ZIP"
          placeholderTextColor="#D9D9D9"
          value={zip}
          onChangeText={(text) => setZIP(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Address: Country"
          placeholderTextColor="#D9D9D9"
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>ADD CONTACT DETAILS</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskField}>
                ID: <Text style={styles.taskText}>{item.id}</Text>
              </Text>
              <Text style={styles.taskField}>
                Task Name: <Text style={styles.taskText}>{item.name}</Text>
              </Text>
              <Text style={styles.taskField}>
                Phone: <Text style={styles.taskText}>{item.phone}</Text>
              </Text>
              <Text style={styles.taskField}>
                Department: <Text style={styles.taskText}>{item.department}</Text>
              </Text>
              <Text style={styles.taskField}>
                Street: <Text style={styles.taskText}>{item.street}</Text>
              </Text>
              <Text style={styles.taskField}>
                City: <Text style={styles.taskText}>{item.city}</Text>
              </Text>
              <Text style={styles.taskField}>
                State: <Text style={styles.taskText}>{item.state}</Text>
              </Text>
              <Text style={styles.taskField}>
                ZIP: <Text style={styles.taskText}>{item.zip}</Text>
              </Text>
              <Text style={styles.taskField}>
                Country: <Text style={styles.taskText}>{item.country}</Text>
              </Text>
            
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => viewTaskHandler(item)}>
                  <Text style={styles.actionText}>VIEW CONTACT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  key={index}
                  style={styles.actionButton}
                  onPress={() => deleteHandler(index)}>
                  <Text style={styles.actionText}>DELETE CONTACT</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}
