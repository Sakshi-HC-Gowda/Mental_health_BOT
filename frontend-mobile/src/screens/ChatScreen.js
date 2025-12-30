// /frontend-mobile/src/screens/ChatScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendMessage } from '../api/chatApi';
import CrisisModal from '../components/CrisisModal';
import { COLORS } from '../utils/constants';

// Mock Component for Chat Bubbles (P0 simplicity)
const ChatBubble = ({ message }) => (
  <View style={[
    styles.bubble, 
    message.user === 'user' ? styles.userBubble : styles.botBubble
  ]}>
    <Text style={styles.bubbleText}>
      {message.text}
    </Text>
  </View>
);

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'bot', text: "Hello! I'm MindBloom, your private AI support. How are you feeling right now? Remember, I'm here to listen without judgment." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCrisisModalVisible, setIsCrisisModalVisible] = useState(false);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    const newUserMessage = { id: Date.now(), user: 'user', text: userMessage };
    
    // 1. Update UI immediately with user's message
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // 2. Call the P0 API
      const response = await sendMessage(userMessage);

      // 3. Handle Crisis Detection (P0 CRITICAL PATH)
      if (response.status === 'crisis_detected') {
        setIsCrisisModalVisible(true); // Show the safety lockout modal
        // Add a safety message from the bot
        const crisisBotMessage = {
          id: Date.now() + 1,
          user: 'bot',
          text: response.message || 'We detected a high-risk phrase. Please use the emergency button below.'
        };
        setMessages(prev => [...prev, crisisBotMessage]);
      } 
      // 4. Handle Normal AI Response
      else if (response.status === 'ok' && response.response) {
        const botMessage = {
          id: Date.now() + 1,
          user: 'bot',
          text: response.response,
        };
        setMessages(prev => [...prev, botMessage]);
      } 
      // 5. Handle General Error
      else {
        Alert.alert('Error', response.message || 'An unknown error occurred.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Could not connect to the MindBloom server.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading]);

  const handleCloseCrisisModal = () => {
    setIsCrisisModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* P0: Crisis Modal - Must be the top layer */}
      <CrisisModal 
        visible={isCrisisModalVisible} 
        onClose={handleCloseCrisisModal} 
      />

      {/* P0: Emergency Button in Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MindBloom Chat</Text>
        <Button 
          title="🚨 Emergency" 
          onPress={() => setIsCrisisModalVisible(true)} 
          color={COLORS.crisisRed}
        />
      </View>
      
      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatBubble message={item} />}
        keyExtractor={item => item.id.toString()}
        style={styles.chatList}
        inverted // Chat apps typically display newest messages at the bottom
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            editable={!isLoading && !isCrisisModalVisible} // Lock input during load/crisis
          />
          <Button 
            title={isLoading ? "Sending..." : "Send"}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading || isCrisisModalVisible}
            color={COLORS.primary}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: COLORS.secondary,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  chatList: { flex: 1, paddingHorizontal: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  // Bubble Styles
  bubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
    marginVertical: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.chatBubbleUser,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.chatBubbleBot,
  },
  bubbleText: {
    color: COLORS.textDark,
  }
});

export default ChatScreen;