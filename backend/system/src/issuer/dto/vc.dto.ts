export class VC{
    constructor(data?: Partial<VC>) {
        Object.assign(this, data)
    }

    id: string; // 이 VC 를 가리키는 did
    issuer: string; // issuer_did
    subject: string; // holder_did (제출한)

    department: string; //부서 이름
    position: string; //직위
    join: string; //입사날짜(yyyymmdd)
    leave: string; //퇴사날짜(yyyymmdd)
}