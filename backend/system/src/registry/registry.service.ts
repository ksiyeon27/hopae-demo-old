import { Injectable } from '@nestjs/common';

@Injectable()
export class RegistryService {
  constructor() {}

  test() {
    return 'test';
  }
}
