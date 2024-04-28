import { Controller, Post, Body } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { RequestCareerVcDTO } from './dto/request-career-vc.dto';
@Controller('career-issuer')
export class IssuerController {
    constructor(readonly issuerService: IssuerService) {}

    @Post()
    async request_vc(@Body() career_vc_request_data: RequestCareerVcDTO): Promise<string>{
        this.issuerService.start()
        return await this.issuerService.request_vc(career_vc_request_data)
    }

}
