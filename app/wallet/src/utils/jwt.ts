import { CredentialInfo } from '@/entities/credentialInfo';

const dummyCredential: CredentialInfo = {
  name: '인증서',
  issuer: '발급기관 A',
  issueDate: new Date(2023, 10, 22),
  fields: ['나이', '성별', '국가'],
  rawString: 'abnkbankankanknaknlq12312@32n4k123@!!#',
};

export const extractData = (vc: string): CredentialInfo | null => {
  return dummyCredential;
};

export const makeVP = (vc: string, fields: string[]) => {
  return vc;
};
