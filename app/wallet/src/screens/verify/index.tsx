import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VerifyScreenProps = NativeStackScreenProps<RootStackParamList, 'Verify'>;
const VerifyScreen: FC<VerifyScreenProps> = ({ navigation, route }) => {
  useEffect(() => {
    console.log(route.params);
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>Verify Screen</Text>
    </View>
  );
};

export default VerifyScreen;
