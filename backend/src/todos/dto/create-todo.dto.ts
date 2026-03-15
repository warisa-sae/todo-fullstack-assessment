import { IsString, IsNotEmpty, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateTodoDto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string
}