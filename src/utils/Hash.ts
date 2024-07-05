import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export default class Hash{
  constructor(){}

  async hashPass(password: string) {
    try {
      const salt = Number(process.env.APLICATION_SALT)
      const hash = await bcrypt.hash(password, salt)

      return hash
    } catch (error) { 
      throw new Error("Error hash password")
    }
  }

  async compare(password: string, passHah: string) {
    try {      
      const equal = await bcrypt.compare(password, passHah)    
      return equal
    } catch (error) {
      throw new Error("Error compare password")
    }
  }
}