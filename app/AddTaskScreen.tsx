import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateTask } from './src/utils/validation';
import { formatTime, isValidTime, calculateAlarmTime } from './src/utils/dateTime';
import { useTaskContext } from './TaskProvider';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const { addTask } = useTaskContext();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleTimeInput = (inputTime: string) => {
    if (isValidTime(inputTime)) {
      setTime(inputTime);
    } else {
      Alert.alert('Invalid Time', 'Please enter time in HH:MM AM/PM format');
    }
  };

  const handleSaveTask = () => {
    const error = validateTask(taskName, description, time);
    if (error) {
      Alert.alert('Validation Error', error);
      return;
    }

    if (!isValidTime(time)) {
      Alert.alert('Invalid Time', 'Please enter time in HH:MM AM/PM format');
      return;
    }

    const alarmTimes = calculateAlarmTime(time);
    const newTask = {
      id: Date.now().toString(),
      title: taskName,
      description,
      time: formatTime(time),
      completed: false,
      alarmTimes,
    };

    addTask(newTask);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Task</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
        placeholderTextColor="#666"
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM AM/PM)"
        value={time}
        onChangeText={handleTimeInput}
        placeholderTextColor="#666"
      />

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSaveTask}
      >
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddTaskScreen;