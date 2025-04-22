import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending messages to AI
  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { role: 'user', content: message };
      setChatHistory([...chatHistory, userMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer <sk-84010ba63b354a939c8d3e69d5a01172>`, // Replace with your OpenAI API key
          },
          body: JSON.stringify({
            model: 'deepseek-chat', // Use the appropriate model
            messages: [
              {...chatHistory}, 
              {userMessage}
            ],
            "stream": false, // Set to true for streaming responses
            max_tokens: 150, // Limit response length
            temperature: 0.7, // Adjust creativity
          }),
        });

        const data = await response.json();

        // Check if the response is valid
        if (data.choices && data.choices[0].message) {
          const aiMessage = { role: 'assistant', content: data.choices[0].message.content };
          setChatHistory((prev) => [...prev, aiMessage]);
        } else {
          throw new Error('Invalid response from API');
        }
      } catch (error) {
        console.error('Error during AI chat:', error);
        const errorMessage = { role: 'assistant', content: 'Something went wrong. Please try again.' };
        setChatHistory((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Render chat messages
  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="logo-github" size={40} color="#333" />
        <Text style={styles.headerTitle}>Chat with AI</Text>
      </View>

      <FlatList
        data={chatHistory}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatList}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>AI is thinking...</Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  chatList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});

export default ChatScreen;