import { SDJwtInstance } from "@sd-jwt/core";
import { ES256, generateSalt, digest } from "@sd-jwt/crypto-nodejs";

async function vptest() {
  const { publicKey: issPublicKey, privateKey: issPrivateKey } =
    await ES256.generateKeyPair();
  console.log(issPublicKey);
  console.log(issPrivateKey);
  const { publicKey: holdPublicKey, privateKey: holdPrivateKey } =
    await ES256.generateKeyPair();
  console.log(holdPublicKey);
  console.log(holdPrivateKey);
  const sdjwtIssue = new SDJwtInstance({
    signer: await ES256.getSigner(issPrivateKey),
    // verifier: await ES256.getVerifier(issPublicKey),
    signAlg: "ES256",
    hasher: digest,
    hashAlg: "SHA-256",
    saltGenerator: generateSalt,
  });
  const sdjwtPresent = new SDJwtInstance({
    // signer: await ES256.getSigner(issPrivateKey),
    // verifier: await ES256.getVerifier(issPublicKey),
    // signAlg: "ES256",
    hasher: digest,
    hashAlg: "SHA-256",
    saltGenerator: generateSalt,
    kbSigner: await ES256.getSigner(holdPrivateKey),
    kbSignAlg: "ES256",
    // kbVerifier: await ES256.getVerifier(holdPublicKey),
  });
  const sdjwtVerify = new SDJwtInstance({
    verifier: await ES256.getVerifier(issPublicKey),
    signAlg: "ES256",
    hasher: digest,
    hashAlg: "SHA-256",
    // saltGenerator: generateSalt,
    kbSignAlg: "ES256",
    kbVerifier: await ES256.getVerifier(holdPublicKey),
  });

  const claims = {
    iss: "경력 증명서를 발급해주는 회사",
    // iat: new Date().getTime(),
    iat: "1714303504576",
    vct: "https://example.com",
    // id: 'did:example:vcvc123',
    // issuer: 'did:example:issuer456',
    // subject: 'did:example:holder789',
    id: "VC 의 id 인 did",
    issuer: "issuer_did",
    subject: "example_did",
    department: "개발부서",
    position: "대리",
    join: "20221222",
    leave: "20241222",
  };
  const disclosureFrame = {
    _sd: ["department", "position", "join", "leave"],
  };

  const credential = await sdjwtIssue.issue(claims, disclosureFrame);
  console.log("\ncredential:");
  console.log(credential);

  const kbPayload = {
    iat: Math.floor(Date.now() / 1000),
    aud: "https://example.com",
    nonce: "DiF0tB2VN-F73cnE3homjL2",
  };

  const presentationFrame = {
    department: true,
    join: true,
  };
  const presentation = await sdjwtPresent.present(
    credential,
    presentationFrame,
    { kb: { payload: kbPayload } }
  );
  console.log("\npresentation:");
  console.log(presentation);

  console.log(await sdjwtVerify.verify(presentation, ["department"], true));
  // console.log(1<2);
}

vptest();
