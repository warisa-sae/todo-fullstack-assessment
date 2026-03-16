import { IsOptional, IsString, MaxLength, IsBoolean, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateTodoDto {
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title?: string

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean
}