import RNFS from 'react-native-fs';
import axios from 'axios';

export const transcribeAudio = async (filePath: string) => {
  const formData = new FormData();
  console.log('pop', filePath.split('/').pop())
  formData.append('file', {
    uri: 'file://' + filePath,
    name: filePath.split('/').pop(),
    type: 'audio/oog',
  } as any);

  try {
    const response = await axios.post('http://localhost:5000/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  
    console.log('✅ Transcription Success:', response.data);
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('❌ Transcription Failed:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ No response received from backend:', error.request);
    } else {
      // Something else caused the error
      console.error('❌ Error setting up request:', error.message);
    }
  }
};