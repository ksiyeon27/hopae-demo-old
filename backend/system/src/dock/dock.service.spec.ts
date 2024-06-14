import { Test, TestingModule } from '@nestjs/testing';
import { DockService } from './dock.service';
import exp from 'constants';

describe('DockService', () => {
  let service: DockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DockService],
    }).compile();

    service = module.get<DockService>(DockService);
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
});

function compareUint8Arrays(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
