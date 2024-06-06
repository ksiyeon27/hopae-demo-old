import CryptoJS from 'crypto-js';

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

export const getSigner = (privateKey: string) => {
  return (data: string) => {
    const signature = CryptoJS.HmacSHA256(data, privateKey).toString(
      CryptoJS.enc.Base64,
    );
    return signature;
  };
};
