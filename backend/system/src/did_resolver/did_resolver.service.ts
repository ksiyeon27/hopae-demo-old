import { HttpException, Injectable } from '@nestjs/common';
import { DockService } from 'src/dock/dock.service';
import { DockDidUtilService } from 'src/dock/util_service/util.service';

@Injectable()
export class DidResolverService {
  getDidDoc(did: string): Promise<Record<string, any>> {
    throw new Error('Method not implemented.');
  }

  getPulbicKeyByDid(did: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export class DidResolverServiceWebImpl implements DidResolverService {
  async getPulbicKeyByDid(did: string): Promise<string> {
    const didDoc = await this.getDidDoc(did);
    if (!didDoc) {
      return undefined;
    }
    const verificationMethods = didDoc.verificationMethod;
    // 걍 첫번째꺼 가져오자
    const publicKeyJwk = verificationMethods[0].publicKeyJwk;
    return publicKeyJwk;
  }
  async getDidDoc(did: string) {
    console.log(`==DidResolverService: getDidDoc ${did} ==`);
    console.log(process.env.DOCK);
    const res = await fetch(`https://web-did-registry.vercel.app/did/${did}`, {
      method: 'GET',
    });
    const didDoc = await res.json();
    // console.log(didDoc);
    if (!res.ok) {
      return undefined;
    }
    return didDoc;
  }
}

export class DidResolverServiceDockImpl implements DidResolverService {
  constructor(
    readonly dockService: DockService,
    readonly dockDidUtilService: DockDidUtilService,
  ) {}
  async getPulbicKeyByDid(did: string): Promise<any> {
    const didDoc = await this.getDidDoc(did);
    const publicKeysOfDoc = didDoc.publicKey;
    const base58EncodedKeys = publicKeysOfDoc.map(
      (key: any) => key.publicKeyBase58,
    );
    const pulblicJwk =
      this.dockDidUtilService.aggregateBase58KeysToJwk(base58EncodedKeys);
    return pulblicJwk;
  }
  async getDidDoc(did: string): Promise<Record<string, any>> {
    await this.dockService.connectToNode();
    const didDoc = await this.dockService.resolveDid(did);
    await this.dockService.disconnectNode();
    return didDoc;
  }
}
