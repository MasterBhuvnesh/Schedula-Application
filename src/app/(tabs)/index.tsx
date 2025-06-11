import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Network from 'expo-network';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeTab() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const qrUrl =
    'https://bqoschvttqomhxalmxoi.supabase.co/storage/v1/object/public/tickets/8f95bb70-3013-4af0-be37-f7aa57c1cbd6/eccbe00e-b420-427b-b728-ec601388e67d.png';

  // Network connectivity check
  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        setIsOnline(
          typeof networkState.isConnected === 'boolean'
            ? networkState.isConnected
            : null
        );
      } catch (error) {
        console.error('Error checking network:', error);
        setIsOnline(false);
      }
    };

    checkNetwork();

    const subscription = Network.addNetworkStateListener(({ isConnected }) => {
      setIsOnline(typeof isConnected === 'boolean' ? isConnected : null);
    });

    return () => subscription?.remove?.();
  }, []);

  // QR download handler
  const handleDownload = async () => {
    if (!isOnline) {
      Alert.alert('Offline', 'You need to be online to download the QR code');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Check and request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please allow access to save QR codes'
        );
        return;
      }

      // Create download directory
      const downloadDir = `${FileSystem.documentDirectory}downloads/`;
      await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });

      // Define local file path
      const fileName = `qr-code-${Date.now()}.png`;
      const localUri = `${downloadDir}${fileName}`;

      // Download the file
      const downloadResumable = FileSystem.createDownloadResumable(
        qrUrl,
        localUri,
        {},
        downloadProgress => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
          console.log(`Download progress: ${Math.round(progress * 100)}%`);
        }
      );

      const downloadResult = await downloadResumable.downloadAsync();
      if (!downloadResult || !downloadResult.uri) {
        throw new Error('Download failed or returned no URI');
      }
      const { uri } = downloadResult;

      // Save to gallery (optional)
      await MediaLibrary.saveToLibraryAsync(uri);

      Alert.alert('Success', 'QR code saved to your downloads folder!', [
        { text: 'OK' },
      ]);
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download QR code. Please try again.');
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.header}>Schedula</Text>

        {/* Network status indicator */}
        <Text style={isOnline ? styles.online : styles.offline}>
          {isOnline === null
            ? 'Checking network...'
            : isOnline
              ? 'Online ✅'
              : 'Offline ❌'}
        </Text>

        {/* QR Code display */}
        <View style={styles.qrContainer}>
          <Image
            source={{ uri: qrUrl }}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

        {/* Download button - disabled when offline or downloading */}
        <TouchableOpacity
          onPress={handleDownload}
          disabled={!isOnline || isDownloading}
          style={[
            styles.downloadButton,
            (!isOnline || isDownloading) && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>
            {isDownloading ? 'Downloading...' : 'Download QR'}
          </Text>
        </TouchableOpacity>

        {/* Download progress indicator */}
        {isDownloading && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${downloadProgress * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(downloadProgress * 100)}% downloaded
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  online: {
    color: 'green',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
  },
  offline: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressContainer: {
    width: '80%',
    alignItems: 'center',
  },
  progressBackground: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
