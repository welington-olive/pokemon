import { JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

config();

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET!,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as any,
};

export const jwtSecret: string = process.env.JWT_SECRET!;

