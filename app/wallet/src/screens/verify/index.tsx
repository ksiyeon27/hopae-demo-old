import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';

type VerifyScreenProps = NativeStackScreenProps<RootStackParamList, 'Verify'>;
const VerifyScreen: FC<VerifyScreenProps> = ({ navigation, route }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [randomString, setRandomString] = useState<string>('');
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    if (
      !route.params.url ||
      !route.params.randomString ||
      !route.params.fields
    ) {
      Alert.alert('비정상적인 접근입니다');
      navigation.goBack();
      return;
    }
    setUrl(route.params.url);
    setRandomString(route.params.randomString);
    setFields(route.params.fields);
    setOpen(true);
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text>{'앱에서 인증을 완료해주세요'}</Text>
      <Modal
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}>
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
            {'인증 페이지에서 다음 사항을 요청합니다'}
          </Text>
          {fields.map((f) => {
            return <Text style={{ fontSize: 18, color: 'black' }}>{f}</Text>;
          })}
        </View>
      </Modal>
    </View>
  );
};

export default VerifyScreen;
