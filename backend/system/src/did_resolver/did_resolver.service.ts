import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class DidResolverService {
  async getDidDoc(did: string) {
    console.log(`==DidResolverService: getDidDoc ${did} ==`);
    const res = await fetch(`https://web-did-registry.vercel.app/did/${did}`, {
      method: 'GET',
    });
    if (res.status !== 200) {
      throw new HttpException('해당하는 did가 web-registry에 없음', 400);
    }
    const didDoc = await res.json();
    // console.log(didDoc);

    return didDoc;
  }
}
