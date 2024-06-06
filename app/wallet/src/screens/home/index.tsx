import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialInfo } from '@/entities/credentialInfo';
import { extractData } from '@/utils/jwt';
import { useIsFocused } from '@react-navigation/native';
import { frontendHostingUrl } from '@/common/config';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: FC<HomeScreenProps> = ({ navigation, route }) => {
  const vw = Dimensions.get('window').width;
  const vh = Dimensions.get('window').height;
  const [credentials, setCredentials] = useState<CredentialInfo[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    const _getData = async () => {
      const creds = await AsyncStorage.getItem('credentials');
      if (creds) {
        const parsedCreds = JSON.parse(creds);
        const extractedCreds = await Promise.all(
          parsedCreds.map((c: string) => extractData(c)),
        );
        setCredentials(extractedCreds.filter((c) => c !== null));
      } else {
        setCredentials([]);
      }
    };
    _getData().catch((e) => {
      console.error(e);
      Alert.alert('인증서 정보 불러오기에 실패했습니다');
    });
  }, [isFocused, flag]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        height: vh,
        overflow: 'scroll',
      }}>
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
          flex: 1,
          width: vw - 32,
          padding: 16,
          marginTop: 16,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: '#d0d0d0',
        }}>
        {credentials.length > 0 ? (
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
        ) : (
          <View>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {'텅텅 비었습니다'}
            </Text>
          </View>
        )}
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(frontendHostingUrl + '/issuer1');
        }}>
        <View
          style={{
            padding: 16,
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#d0d0d0',
          }}>
          <Text style={{ fontSize: 20, color: 'black' }}>
            {'인증서 발급받기(웹 자동 연결)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          Linking.openURL(frontendHostingUrl + '/verifier1');
        }}>
        <View
          style={{
            padding: 16,
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#d0d0d0',
          }}>
          <Text style={{ fontSize: 20, color: 'black' }}>
            {'인증하기(웹 자동 연결)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          AsyncStorage.removeItem('credentials').then(() => {
            setFlag((f) => !f);
          });
        }}>
        <View
          style={{
            padding: 16,
            marginTop: 16,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#d0d0d0',
          }}>
          <Text style={{ fontSize: 20, color: 'black' }}>
            {'인증서 다 찢어버리기'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeScreen;
