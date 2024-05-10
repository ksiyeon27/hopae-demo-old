import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractIssuer } from '@/utils/jwt';
import axios from 'axios';

type IssueScreenProps = NativeStackScreenProps<RootStackParamList, 'Issue'>;
const IssueScreen: FC<IssueScreenProps> = ({ navigation, route }) => {
  const saveVC = async (vc: string) => {
    const issuer = extractIssuer(vc);
    try {
      await AsyncStorage.setItem('vc-' + issuer, vc);
    } catch (e) {
      console.error(e);
      navigation.goBack();
    }
  };

  useEffect(() => {
    console.log(route.params);
    axios.post(route.params.url, route.params.randomString).then((res) => {
      saveVC(res.data);
      Alert.alert('인증서 발급 완료', '인증서 발급이 완료되었습니다.');
      navigation.goBack();
    });
    // call url
    // and save vc
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>{'인증서를 발급중입니다...'}</Text>
    </View>
  );
};

export default IssueScreen;
