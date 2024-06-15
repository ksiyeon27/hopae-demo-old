import { CredentialInfo } from '@/entities/credentialInfo';
import { SDJwtInstance } from '@sd-jwt/core';
import { decodeSdJwt, getClaims } from '@sd-jwt/decode';
import { digest, generateSalt, getSigner } from '@/utils/crypto';
import { HMAC } from 'react-native-simple-crypto';
import { Buffer } from 'buffer';

// Your secret key (private key for HS256)
const secretKey = 'your-very-secure-private-key';

export const holderPrivateKey = {
  key_ops: ['sign'],
  ext: true,
  kty: 'EC',
  x: 'SKe8y2LIr5ig9YMF1kV08wOvCUKGndAp_77AargmDTA',
  y: '3cC13BAJCLIFUQqImQXRndHL4vwvO-h0OdPSHah_qCQ',
  crv: 'P-256',
  d: '0z6YrIvfSiThDDSoxwA81csdxuU5DRFVZSYXE9X-A4w',
};

export const dummyEncrypt = (data: string) => {
  return data + 'mock';
};

// Function to encrypt a string
export const encrypt = async (data: string) => {
  const keyBuffer = Buffer.from(secretKey);
  const dataBuffer = Buffer.from(data);
  const hashBuffer = await HMAC.hmac256(dataBuffer, keyBuffer);
  return Buffer.from(hashBuffer).toString('base64');
};

export const extractData = async (
  vc: string,
): Promise<CredentialInfo | null> => {
  try {
    const { 0: header, 1: payload, 2: signature, length } = vc.split('.');
    const decodedSdJwt = await decodeSdJwt(vc, digest);
    const claims: any = await getClaims(
      decodedSdJwt.jwt.payload,
      decodedSdJwt.disclosures,
      digest,
    );
    const vpInstance = new SDJwtInstance({
      hasher: digest,
      hashAlg: 'SHA-256',
      saltGenerator: generateSalt,
      kbSigner: undefined,
      kbSignAlg: 'ES256',
    });
    return {
      name: claims.vct,
      issuer: claims.iss,
      issueDate: new Date(claims.iat),
      fields: await vpInstance.presentableKeys(vc),
      rawString: vc,
    };
  } catch (e) {
    return null;
  }
};

export const makeVP = async (vc: string, fields: string[], nonce: string) => {
  const vpInstance = new SDJwtInstance({
    hasher: digest,
    hashAlg: 'SHA-256',
    saltGenerator: generateSalt,
    kbSigner: await getSigner(holderPrivateKey),
    kbSignAlg: 'EdDSA',
  });

  let presentationFrame: { [key: string]: boolean } = {};
  fields.forEach((key) => {
    presentationFrame[key] = true;
  });
  const kbPayload = {
    iat: new Date().getTime(),
    aud: 'VP 받는 사람',
    nonce: nonce,
  };

  return vpInstance.present(vc, presentationFrame, {
    kb: { payload: kbPayload },
  });
};
