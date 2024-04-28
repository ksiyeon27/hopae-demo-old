import { Controller, Post, Body } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestCareerVcDTO } from './dto/request-vc.dto';
import { VC } from './dto/vc.dto';

@Controller('career-issuer')
export class IssuerController {
    constructor(readonly issuerService: IssuerService) {}

    @Post()
    request_vc(@Body() vc_request_data: RequestCareerVcDTO): VC{
        this.issuerService.start()
        return this.issuerService.request_vc(vc_request_data)
    }

}
