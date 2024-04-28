export class Player {
    constructor(data?: Partial<Player>) { 
        Object.assign(this, data)
    }
    id: string; //나의 did
    private_key: string; //나의 private_key
}
  