import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { validateTask } from './src/utils/validation';
import { useTaskContext } from './TaskProvider';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  time: string;
  description: string;
}

const HomeScreen = () => {
    const navigation = useNavigation();
    const { tasks, toggleTaskComplete } = useTaskContext();

    const renderTask = ({ item }: { item: Task }) => (
        <TouchableOpacity 
            style={styles.taskItem}
            onPress={() => toggleTaskComplete(item.id)}
        >
            <View style={styles.taskRow}>
                <View style={[styles.checkbox, item.completed && styles.checked]}>
                    {item.completed && <Icon name="checkmark" size={16} color="#FFF" />}
                </View>
                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My To-Do List</Text>
                <TouchableOpacity>
                    <Icon name="notifications-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                style={styles.list}
            />


            <TouchableOpacity 
                style={styles.chatButton}
                onPress={() => navigation.navigate('ChatScreen')}
            >
                <Text style={styles.chatButtonText}>Chat with AI</Text>
            </TouchableOpacity>


            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddTaskScreen')}
            >
                <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  chatButton: {
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  chatButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
  },
});

export default HomeScreen;