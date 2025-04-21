import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // TODO: Implement AI chat functionality
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.aiContainer}>
          <Icon name="logo-github" size={40} color="#333" />
          <Text style={styles.aiTitle}>AI</Text>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.aiMessage}>
            What would you like to schedule today?
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your task..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  aiContainer: {
    alignItems: 'center',
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  aiMessage: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    maxHeight: 100,
    marginBottom: 12,
  },
  sendButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ChatScreen;