import { IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateTodoDto {
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean
}