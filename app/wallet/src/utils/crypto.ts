import CryptoJS from 'crypto-js';
import { ec as EC } from 'elliptic';

export const generateSalt = (length: number) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let salt = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    salt += charset[randomIndex];
  }
  return salt;
};

export const digest = (data: string) => {
  const wordArray = CryptoJS.SHA256(data);
  const uint8Array = new Uint8Array(wordArray.words.length * 4);
  for (let i = 0; i < wordArray.words.length; i++) {
    const word = wordArray.words[i];
    uint8Array[i * 4] = (word >> 24) & 0xff;
    uint8Array[i * 4 + 1] = (word >> 16) & 0xff;
    uint8Array[i * 4 + 2] = (word >> 8) & 0xff;
    uint8Array[i * 4 + 3] = word & 0xff;
  }
  return uint8Array;
};

const ec = new EC('p256');

function base64UrlToBase64(base64Url: string) {
  return base64Url.replace(/-/g, '+').replace(/_/g, '/');
}

function base64UrlToHex(base64Url: string) {
  const base64 = base64UrlToBase64(base64Url);
  const binaryString = atob(base64);
  return Array.from(binaryString, (char) =>
    ('0' + char.charCodeAt(0).toString(16)).slice(-2),
  ).join('');
}

// Function to import a private key from a JWK object
function importPrivateKey(privateKeyJWK: any) {
  const { d } = privateKeyJWK;
  const dHex = base64UrlToHex(d);
  return ec.keyFromPrivate(dHex, 'hex');
}

// Function to convert Uint8Array to Base64URL
function toBase64Url(uint8Array: Uint8Array) {
  let base64 = '';
  uint8Array.forEach((byte) => {
    base64 += String.fromCharCode(byte);
  });
  return btoa(base64).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Function to sign data
export const getSigner = (privateKeyJWK: any) => {
  const privateKey = importPrivateKey(privateKeyJWK);

  return async (data: string) => {
    const hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
    const signature = privateKey.sign(hash, { canonical: true });
    const r = signature.r.toArrayLike(Uint8Array, 'be', 32);
    const s = signature.s.toArrayLike(Uint8Array, 'be', 32);
    const signatureBytes = new Uint8Array([...r, ...s]);
    return toBase64Url(signatureBytes);
  };
};
