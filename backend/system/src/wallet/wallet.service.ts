import { Injectable } from '@nestjs/common';
import { VerifyCareerVpDTO } from './dto/verify-career-vp.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class WalletService {
  constructor(readonly jwtService: JwtService) {}
  private holder: Player;

  async verify_career_vp(
    career_vp_verify_data: VerifyCareerVpDTO,
  ): Promise<boolean> {
    console.log('holder');
    const holder = this.jwtService.getHolder();
    console.log(holder.id);
    console.log(career_vp_verify_data);
    return false;
  }
}
