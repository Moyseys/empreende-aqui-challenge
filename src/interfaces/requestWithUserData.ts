import { Request } from 'express';
import UserPayload from './userPayload';

interface UserData {
  userData: UserPayload
} 

interface RequestWithUserData extends UserData, Request{}

export default RequestWithUserData