import { Injectable } from '@nestjs/common';
import { CareerIssuerMeService } from 'src/career_issuer_me/career_issuer_me.service';
import { DockService } from 'src/dock/dock.service';
import { DockDidUtilService } from 'src/dock/util_service/util.service';
import { JwtService } from 'src/jwt/jwt.service';
import { TestHolderService } from 'src/test_holder/test_holder.service';

@Injectable()
export class InitService {
  constructor(
    private readonly careerIssuerMeService: CareerIssuerMeService,
    private readonly testHolderService: TestHolderService,
    private readonly dockService: DockService,
    private readonly dockDidUtilService: DockDidUtilService,
    private readonly jwtService: JwtService,
  ) {}

  async initIssuer({ issuerName }: { issuerName: string }) {
    console.log(`-----------------initIssuer (${issuerName})-----------------`);
    // 이미 localhost 에 websocket - dock substrate node 가 떠있어야 한다.
    await this.dockService.connectToNode();
    /// issuer1 : 경력 증명서 떼주는 issuer --------------------------------------------

    const did = this.dockService.createRandomDid();
    const { publicKey, privateKey } = await this.jwtService.generateJwkPair();
    const didKeys = this.dockDidUtilService.publicJwkToDidKeys(publicKey);
    console.log('did doc, pulicKey register 시작 --------->');
    await this.dockService.registerDidWithDidKeys(didKeys, did);
    console.log('did doc, publicKey register 완료 --------->');
    console.log('did', did);
    console.log('publicKey', publicKey);
    await this.dockService.disconnectNode();

    console.log('엔티티 및 key pair 디비에 저장 시작 --------->');
    await this.careerIssuerMeService.create(
      did,
      JSON.stringify(publicKey),
      JSON.stringify(privateKey),
      issuerName,
    );
    console.log('엔티티 및 key pair 디비에 저장 완료 --------->');
    console.log('issuer1Did', did);
    console.log('publicKey', publicKey);
    console.log('privateKey', privateKey);
    console.log('-----------------initIssuer-----------------|FINISH');
    console.log(`\n\n`);
    return did;
  }

  async initHolder() {
    console.log('-----------------initHolder-----------------');
    // 이미 localhost 에 websocket - dock substrate node 가 떠있어야 한다.
    await this.dockService.connectToNode();
    /// issuer1 : 경력 증명서 떼주는 issuer --------------------------------------------

    const did = this.dockService.createRandomDid();
    const { publicKey, privateKey } = await this.jwtService.generateJwkPair();
    const didKeys = this.dockDidUtilService.publicJwkToDidKeys(publicKey);
    console.log('did doc, pulicKey register 시작 --------->');
    await this.dockService.registerDidWithDidKeys(didKeys, did);
    console.log('did doc, publicKey register 완료 --------->');
    console.log('did', did);
    console.log('publicKey', publicKey);
    await this.dockService.disconnectNode();

    console.log('엔티티 및 key pair 디비에 저장 시작 --------->');
    await this.testHolderService.create(
      did,
      JSON.stringify(publicKey),
      JSON.stringify(privateKey),
    );
    console.log('엔티티 및 key pair 디비에 저장 완료 --------->');
    console.log('issuer1Did', did);
    console.log('publicKey', publicKey);
    console.log('privateKey', privateKey);
    console.log('-----------------initHolder-----------------|FINISH');
    console.log(`\n\n`);
    return did;
  }
}
