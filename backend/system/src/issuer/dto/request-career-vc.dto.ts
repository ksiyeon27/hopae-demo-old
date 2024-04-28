import { IsString } from 'class-validator';

export class RequestCareerVcDTO{
    @IsString()
    readonly holder_did: string;

    @IsString()
    readonly orignal_nonce: string;
    @IsString()
    readonly encrypted_nonce: string;
}