import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import UserPayload from 'src/interfaces/userPayload';

@Injectable()
export default class GuardRouter{
  constructor(private readonly jwt: JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const token = this.getHeaderToken(req)
    if(!token) throw new UnauthorizedException("Authentication Error")
    
    try {
      const payload: UserPayload = await this.jwt.verify(token)
      req.userData = payload
    } catch (error) {
      throw new UnauthorizedException("Invalid token")
    }
    
    return true
  }

  private getHeaderToken(req: Request): string | undefined {
    const [tipo, token] = req.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}