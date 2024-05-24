import { CredentialInfo } from '@/entities/credentialInfo';
import sdjwt from '@hopae/sd-jwt'
import { SDJwtInstance } from '@sd-jwt/core';
import { decodeSdJwt, getClaims, } from '@sd-jwt/decode';
import { ES256, generateSalt, digest } from "@sd-jwt/crypto-nodejs";

const dummyCredential: CredentialInfo = {
  name: '인증서',
  issuer: '발급기관 A',
  issueDate: new Date(2023, 10, 22),
  fields: ['나이', '성별', '국가'], // 공개 여부를 선택할 수 있는 claim들의 key
  rawString: 'abnkbankankanknaknlq12312@32n4k123@!!#', // vc 원본
};

export const extractData = async (vc: string): Promise<CredentialInfo | null> => {
  const decodedSdJwt = await decodeSdJwt(vc, digest);
  const claims: any = await getClaims(decodedSdJwt.jwt.payload, decodedSdJwt.disclosures, digest);
  let extractedData: CredentialInfo = {
    name: claims.vct,
    issuer: claims.iss,
    issueDate: new Date(claims.iat),
    fields: await sdjwt.presentableKeys(vc),
    rawString: vc,
  };
  return extractedData;
};

export const makeVP = async (vc: string, fields: string[], nonce: string) => {
  const holderPrivateKey = {
    key_ops: [ 'sign' ],
    ext: true,
    kty: 'EC',
    x: 'oMTflW4aPyHeeV6oey035pd8mdBXmXjWbGf8rGDsGeU',
    y: 'T25rLoIYNmA2IWP8ke7OUHvmMgFjKvHqEocXVN0sS_M',
    crv: 'P-256',
    d: 'fv3L5AdxCyzY3g7zq20p_0aiAOtuTv1N7fyHoedZfeM'
  };

  const vpInstance = new SDJwtInstance({
    hasher: digest,
    hashAlg: "SHA-256",
    saltGenerator: generateSalt,
    kbSigner: await ES256.getSigner(holderPrivateKey),
    kbSignAlg: "ES256",
  });

  let presentationFrame: { [key: string]: boolean } = {};
  fields.forEach (key => {
    presentationFrame[key] = true;
  });
  const kbPayload = {
    iat: new Date().getTime(),
    aud: "VP 받는 사람",
    nonce: nonce,
  };

  const vp = vpInstance.present(vc, presentationFrame, { kb: { payload: kbPayload } });
  return vp;
};
