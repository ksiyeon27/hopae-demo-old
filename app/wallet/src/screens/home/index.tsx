import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Dimensions, FlatList, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialInfo } from '@/entities/credentialInfo';
import { extractData } from '@/utils/jwt';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const dummyCredentials = [
  {
    name: '인증서 1',
    issuer: '발급기관 1',
    create_time: new Date(2023, 10, 22),
    // contents
  },
  {
    name: '인증서 2',
    issuer: '발급기관 2',
    create_time: new Date(2024, 1, 11),
    // contents
  },
  {
    name: '인증서 3',
    issuer: '발급기관 3',
    create_time: new Date(),
    // contents
  },
];

const HomeScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;
  const [credentials, setCredentials] = useState<CredentialInfo[]>([]);

  useEffect(() => {
    const _getData = async () => {
      const creds = await AsyncStorage.getItem('credentials');
      setCredentials(
        (creds ? JSON.parse(creds) : []).map((c: string) => extractData(c)),
      );
    };
    _getData().catch((e) => {
      console.error(e);
      Alert.alert('인증서 정보 불러오기에 실패했습니다');
      navigation.goBack();
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
      <View
        style={{
          width: vw - 32,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 28, color: 'black' }}>내 지갑</Text>
      </View>
      <View
        style={{
          width: vw - 32,
          padding: 16,
          marginTop: 16,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: '#d0d0d0',
        }}>
        <FlatList
          data={credentials}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  borderRadius: 8,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: 'black',
                  marginBottom: 8,
                  backgroundColor: 'rgba(210, 247, 255)',
                }}>
                <Text style={{ fontSize: 24, color: 'black' }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 20, color: 'black' }}>
                  {item.issuer}
                </Text>
                {item.fields.map((f) => {
                  return (
                    <Text style={{ fontSize: 18, color: 'black' }}>{f}</Text>
                  );
                })}
                <Text style={{ fontSize: 20, color: 'black' }}>
                  {'유효기간 - ' + item.issueDate.toLocaleDateString('ko-KR')}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
