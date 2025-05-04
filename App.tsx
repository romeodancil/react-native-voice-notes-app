import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { mainAppStyle } from './AppStyle';
import { AudioPage } from './src/page/AudioPage';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

function App(): React.JSX.Element {
  
  return (
    <Provider store={store}>
      <SafeAreaView style={mainAppStyle.appContainer}>
        <Text style={
          mainAppStyle.heading
        }>
          Voice Notes Lite
        </Text>
        <AudioPage />
      </SafeAreaView>
    </Provider>
  )
}

export default App;
