// /frontend-mobile/src/components/CrisisModal.js
import React from 'react';
import { 
  Modal, View, Text, StyleSheet, Linking, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { COLORS, TELE_MANAS_NUMBER } from '../utils/constants';

const CrisisModal = ({ visible, onClose }) => {
  
  // P0: Function to initiate the phone call
  const handleCall = () => {
    Linking.openURL(`tel:${TELE_MANAS_NUMBER}`);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          
          <Text style={styles.title}>🚨 SAFETY WARNING 🚨</Text>
          
          <Text style={styles.message}>
            We have detected content that indicates you may be in distress.
            MindBloom is an **AI-ONLY** service and is not equipped to handle immediate crises.
          </Text>
          
          <Text style={styles.messageBold}>
            YOUR SAFETY IS PARAMOUNT. Please reach out to a verified human professional right now.
          </Text>

          {/* CRITICAL CTA - BIG RED BUTTON */}
          <TouchableOpacity 
            style={styles.callButton} 
            onPress={handleCall}
            activeOpacity={0.8}
          >
            <Text style={styles.callButtonText}>
              CALL TELE MANAS NOW
            </Text>
            <Text style={styles.callButtonSubText}>
              {TELE_MANAS_NUMBER} (Toll-Free, 24/7)
            </Text>
          </TouchableOpacity>

          {/* Secondary Action - Return to chat (for less severe distress) */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>I am safe now, return to chat</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.crisisRed,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 15,
  },
  messageBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 40,
  },
  callButton: {
    backgroundColor: COLORS.crisisRed,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  callButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  callButtonSubText: {
    color: 'white',
    fontSize: 14,
    marginTop: 3,
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default CrisisModal;