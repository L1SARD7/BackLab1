import { IsNotEmpty, IsString, IsOptional, IsUUID } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Name cannot be empty" })
    @IsString()
    name: string;

    @IsOptional()
    @IsUUID()
    defaultCurrencyId?: string;
}
