export class CareerVcClaims {
  constructor(data?: Partial<CareerVcClaims>) {
    Object.assign(this, data);
  }

  department: string; //부서 이름
  position: string; //직위
  join: string; //입사날짜(yyyymmdd)
  leave: string; //퇴사날짜(yyyymmdd)
}

export class CancerClaims {
  constructor(data?: Partial<CancerClaims>) {
    Object.assign(this, data);
  }

  stomach: number; //위암 위험도
  lungs: number; //폐암 위험도
  liver: number; //간암 위험도
  pancreas: number; //췌장암 위험도
}
export class GeneticTestVcClaims {
  constructor(data?: Partial<GeneticTestVcClaims>) {
    Object.assign(this, data);
  }

  hair_loss_gene_heritability: number; //탈모 유전자 유전율
  dermatitis_gene_heritability: number; //피부염 유전자 유전율
  cancer_risk: CancerClaims; //암 위험도
}
