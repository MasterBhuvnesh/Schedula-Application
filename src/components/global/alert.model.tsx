import { AlertModalProps } from '@/src/types/alert.model.type';
import { X } from 'lucide-react-native';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components';
import { wp } from '~/utils';

export default function AlertModal({
  visible = false,
  title = 'Alert',
  description = '',
  onCloseButton = () => {},
  onCloseOutside = () => {},
  customButtons = [],
  showCloseIcon = true,
}: AlertModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => {
          onCloseOutside();
          // console.log('Modal closed by tapping outside');
        }}
      >
        <TouchableOpacity
          style={styles.modalCard}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          {/* Close Icon */}
          {showCloseIcon && (
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => {
                onCloseButton();
                // console.log('Modal closed by close icon');
              }}
            >
              <X size={24} color="#000" />
            </TouchableOpacity>
          )}

          {/* Title */}
          <Text style={styles.title} bold>
            {title}
          </Text>

          {/* Description */}
          {description && <Text style={styles.description}>{description}</Text>}

          {/* Custom Buttons */}
          {customButtons.length > 0 && (
            <View style={styles.buttonsContainer}>
              {customButtons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.customButton,
                    button.buttonstyle || styles.defaultButtonStyle,
                  ]}
                  onPress={() => button.onPress()}
                >
                  <Text style={button.textStyle}>{button.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: wp(90),
    padding: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
    marginTop: 10, // Add margin to account for close icon
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  customButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100,
  },
  defaultButtonStyle: {
    backgroundColor: '#1e1e22',
  },
});
