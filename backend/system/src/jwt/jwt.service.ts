import { Injectable } from '@nestjs/common';
import { ES256, digest, generateSalt } from '@sd-jwt/crypto-nodejs';
import { Claims } from 'src/issuer/dto/claims.dto';
import { SDJwtVcInstance } from '@sd-jwt/sd-jwt-vc';
import type { DisclosureFrame } from '@sd-jwt/types';

@Injectable()
export class JwtService {
    async generateKeyPair() {
        const { privateKey, publicKey } = await ES256.generateKeyPair();
        return { privateKey, publicKey };
    }
    
    async createSignerVerifier() {
        const { privateKey, publicKey } = await this.generateKeyPair();
        const signer = await ES256.getSigner(privateKey);
        const verifier = await ES256.getVerifier(publicKey);
        return { signer, verifier };
    }

    async create_vc_jwt(claims: Claims, vc_id: string, issuer_did: string, holder_did: string) : Promise<string>{
        const { signer, verifier } = await this.createSignerVerifier();
            
        const sdjwt = new SDJwtVcInstance({
            signer,
            verifier,
            signAlg: 'EdDSA',
            hasher: digest,
            hashAlg: 'SHA-256',
            saltGenerator: generateSalt,
        });


        // Issuer Define the disclosure frame to specify which claims can be disclosed
        // 일단 4개 항목 다 sd 로 넣음
        const disclosureFrame: DisclosureFrame<typeof claims> = {
            _sd: ['department', 'position', 'join', 'leave'],
        };

        // Issue a signed JWT credential with the specified claims and disclosures
        // Return a Encoded SD JWT. Issuer send the credential to the holder
        const credential = await sdjwt.issue(
            {
                iss: '경력 증명서를 발급해주는 회사',
                iat: new Date().getTime(),
                vct: 'https://example.com', // 이 3개는 필수
                id: vc_id, // 이 아래 3개는 합의한대로
                issuer: issuer_did, 
                subject: holder_did,
                ...claims,
            },
            disclosureFrame,
        );
        console.log('encodedJwt:', credential);
        // 위까지가 VC 발급하는 
        // 아래는 확인용 validate, decode
        
        // // Holder Receive the credential from the issuer and validate it
        // // Return a result of header and payload
        // const validated = await sdjwt.validate(credential);
        // console.log('validated:', validated);

        // // You can decode the SD JWT to get the payload and the disclosures
        // const sdJwtToken = await sdjwt.decode(credential);

        // // You can get the keys of the claims from the decoded SD JWT
        // const keys = await sdJwtToken.keys(digest);
        // console.log({ keys });

        // // You can get the claims from the decoded SD JWT
        // const payloads = await sdJwtToken.getClaims(digest);

        // // You can get the presentable keys from the decoded SD JWT
        // const presentableKeys = await sdJwtToken.presentableKeys(digest);

        // console.log({
        //     payloads: JSON.stringify(payloads, null, 2),
        //     disclosures: JSON.stringify(sdJwtToken.disclosures, null, 2),
        //     claim: JSON.stringify(sdJwtToken.jwt?.payload, null, 2),
        //     presentableKeys,
        // });

        // console.log(
        //     '================================================================',
        // );

        return credential;
    }
  
}
