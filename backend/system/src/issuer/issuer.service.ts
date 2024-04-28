import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestCareerVcDTO } from './dto/request-vc.dto';
import { Career } from './entities/career.entity';
import { CreateVcDTO } from './dto/create-vc.dto';
import { VC } from './dto/vc.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class IssuerService {
    private careers: Career[] = []; //DB table

    private issuer = new Player({
        id:"issuer_did",
        private_key:"issuer_private_key"
    });

    start() {
        this.careers.push({
            id: "example_did",
            ...{
                department: "개발부서",
                position: "대리",
                join: "20221222",
                leave: "20241222" 
            }
        });

        this.careers.push({
            id: "example_did3",
            ...{
                department: "마케팅부서",
                position: "팀장",
                join: "20181222",
                leave: "20231222" 
            }
        });
    }

    request_vc(vc_request_data: RequestCareerVcDTO): VC{

        // 1. 홀더 검증 : DID resolver API 호출해서 did docs 얻어오고, 난수(vc_request_data.nonce) 복호화 시도
        // 제이가 만든 리졸버 이용
        // GET /did/{did}
        
        // issuer DB 에서 career 가져오기
        const career = this.careers.find((career) => career.id === vc_request_data.holder_did)
        if (!career) {
            throw new NotFoundException(); //안에 message 가능
          }

        // 2. VC 생성 -> this._create_vc 호출
            // 이 안에서는 sd-jwt 이용해서 VC 생성
        const create_vc_data = new CreateVcDTO({
            holder_did: vc_request_data.holder_did,
            department: career.department,
            position: career.position,
            join: career.join,
            leave: career.leave
        });
        console.log(create_vc_data)
        const new_vc = this._create_vc(create_vc_data)

        return new_vc
    }

    _create_vc(create_vc_data: CreateVcDTO): VC{
        //VC 생성 (추후 sd-jwt : issuer 의 pirvate_key 이용)
        const new_vc_did = "VC 의 id 인 did"  // POST /did/{did}?
        const vc = new VC({
            id: new_vc_did,
            issuer: this.issuer.id,
            subject: create_vc_data.holder_did,
            department: create_vc_data.department,
            position: create_vc_data.position,
            join: create_vc_data.join,
            leave: create_vc_data.leave
        });

        console.log(vc);

        return vc;
    }
}
