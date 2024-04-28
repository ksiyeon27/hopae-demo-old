import {IsString} from 'class-validator'

export class RequestCareerVcDTO{
    @IsString()
    readonly holder_did: string;
    @IsString()
    readonly nonce: string;
}