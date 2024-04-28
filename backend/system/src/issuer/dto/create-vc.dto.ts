import {IsString} from 'class-validator'

export class CreateVcDTO{
    constructor(data?: Partial<CreateVcDTO>) { 
        Object.assign(this, data)
    }

    @IsString()
    readonly holder_did: string;
    @IsString()
    readonly department: string;
    @IsString()
    readonly position: string;
    @IsString()
    readonly join: string;
    @IsString()
    readonly leave: string;
}
