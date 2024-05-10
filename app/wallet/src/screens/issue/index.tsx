import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect } from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extractData } from '@/utils/jwt';
import axios from 'axios';

type IssueScreenProps = NativeStackScreenProps<RootStackParamList, 'Issue'>;
const IssueScreen: FC<IssueScreenProps> = ({ navigation, route }) => {
  const vw = Dimensions.get('window').width;
  const saveVC = async (vc: string) => {
    const data = extractData(vc);
    if (!data) {
      Alert.alert('인증서가 잘못된 형식입니다');
      navigation.goBack();
      return;
    }
    const credentials = await AsyncStorage.getItem('credentials');
    let credentialsArr = credentials ? JSON.parse(credentials) : [];
    await AsyncStorage.setItem(
      'credentials',
      JSON.stringify([...credentialsArr, vc]),
    );
    navigation.goBack();
  };

  useEffect(() => {
    console.log(route.params);
    if (!route.params.url || !route.params.randomString) {
      Alert.alert('비정상적인 접근입니다');
      navigation.goBack();
      return;
    }
    saveVC('dumdumdummy');
    // axios.post(route.params.url, route.params.randomString).then((res) => {
    //   saveVC(res.data)
    //     .then(() => {
    //       Alert.alert('인증서 발급 완료', '인증서 발급이 완료되었습니다.');
    //     })
    //     .catch((e) => {
    //       console.error(e);
    //       Alert.alert('인증서 저장에 실패했습니다');
    //     })
    //     .finally(() => {
    //       navigation.goBack();
    //     });
    // });
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <View
        style={{
          width: vw - 32,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 28, color: 'black' }}>
          {'인증서를 발급중입니다...'}
        </Text>
      </View>
    </View>
  );
};

export default IssueScreen;
