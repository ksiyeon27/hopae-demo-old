import { Test, TestingModule } from '@nestjs/testing';
import { DockService } from './dock.service';
import exp from 'constants';
import { DockDidUtilService } from './util_service/util.service';
import { ES256 } from '@sd-jwt/crypto-nodejs';

describe('DockService', () => {
  let service: DockService;
  let utilService: DockDidUtilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockService, DockDidUtilService],
    }).compile();

    service = module.get<DockService>(DockService);
    utilService = module.get<DockDidUtilService>(DockDidUtilService);
  });

  it('should be defined - random did', () => {
    const did = service.createRandomDid();
    expect(did).toBeDefined();
  });
  it('should be expected result(Uint8 array) because uriForIssure1 always make same keyring', async () => {
    const uriForIssuer1 = service.secretUriForIssuer1;
    await service.connectToNode();
    const keypair = service.createKeyPairFromSecretUri(uriForIssuer1);
    console.log('keypair.publicKey :', keypair.publicKey);
    const expectedResultForIssuer1 = new Uint8Array([
      204, 144, 181, 79, 220, 168, 186, 132, 62, 9, 42, 112, 69, 134, 251, 36,
      94, 145, 241, 207, 110, 80, 63, 38, 214, 110, 200, 225, 37, 8, 172, 10,
    ]);
    await service.disconnectNode();
    expect(
      compareUint8Arrays(keypair.publicKey, expectedResultForIssuer1),
    ).toBeTruthy();
  });
  it('should be expected result(Uint8 array) because uriForIssure1 always make same keyring', async () => {
    const uriForIssuer1 = service.secretUriForIssuer1;
    await service.connectToNode();
    const keypair = service.createKeyPairFromSecretUri(uriForIssuer1);
    console.log('keypair.publicKey :', keypair.publicKey);
    const wrongResult = new Uint8Array([
      204, 144, 181, 79, 220, 168, 186, 132, 62, 9, 4, 112, 69, 134, 251, 36,
      91, 125, 241, 207, 110, 80, 64, 38, 214, 112, 100, 225, 37, 8, 172, 10,
    ]);
    await service.disconnectNode();
    expect(compareUint8Arrays(keypair.publicKey, wrongResult)).toBeFalsy();
  });

  it('should', async () => {
    const keypair = await ES256.generateKeyPair();
    const didKeys = utilService.publicJwkToDidKeys(keypair.publicKey);
    console.log('didKeys :', didKeys);
  });

  it('should become jwk', async () => {
    const publicKeyInfoArray = [
      {
        id: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37#keys-1',
        type: 'Sr25519VerificationKey2020',
        controller: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37',
        publicKeyBase58: '9Hfb5kj5eNUY1fAX5g9Y1UEM7xdXwZ4tPGgk2E9rwBbA',
      },
      {
        id: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37#keys-2',
        type: 'Sr25519VerificationKey2020',
        controller: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37',
        publicKeyBase58: '3yHP2Ju1JGkqH736Ym6HZjUwdXADqddXucgoNKWE3WgS',
      },
      {
        id: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37#keys-3',
        type: 'Sr25519VerificationKey2020',
        controller: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37',
        publicKeyBase58: '7tgNufQDX86qTuz76SxKGLPihm3amyjHYQWAUdD7NoFn',
      },
      {
        id: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37#keys-4',
        type: 'Sr25519VerificationKey2020',
        controller: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37',
        publicKeyBase58: '3JcGzFjjf5iy1ydM1Kc2aj7ntjPW2UKMAvrhTQMdf5de',
      },
      {
        id: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37#keys-5',
        type: 'Sr25519VerificationKey2020',
        controller: 'did:dock:5ERsC6g1969UdsTg1JzzYAby2pzJFov4r5S7A8GYpX9Vfr37',
        publicKeyBase58: '6LyTtyNCHbhegQpjHzsox4Pb6kghEZKzuAukaZpUhPUT',
      },
    ];
    const stringified = publicKeyInfoArray
      .map((e) => utilService._decodeBase58(e.publicKeyBase58))
      .join('');
    const parsed = JSON.parse(stringified);
    console.log(parsed);
    expect(parsed satisfies JsonWebKey).toBeTruthy();
  });
});

function compareUint8Arrays(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
