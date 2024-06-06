import { IsNumber, IsString } from 'class-validator';

export class EmployeeData {
  @IsString()
  readonly did: string;
  @IsString()
  readonly department: string;
  @IsString()
  readonly position: string;
  @IsNumber()
  readonly salary: number;
  @IsString()
  readonly join: string;
  @IsString()
  readonly leave: string;
}
