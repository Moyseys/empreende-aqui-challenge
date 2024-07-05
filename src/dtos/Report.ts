import { IsNotEmpty } from 'class-validator'

export default class Report{
  @IsNotEmpty()
  startDate: Date
  finalDate: Date
}