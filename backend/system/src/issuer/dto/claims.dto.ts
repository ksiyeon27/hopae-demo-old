export class Claims{
    constructor(data?: Partial<Claims>) {
        Object.assign(this, data)
    }

    department: string; //부서 이름
    position: string; //직위
    join: string; //입사날짜(yyyymmdd)
    leave: string; //퇴사날짜(yyyymmdd)
}