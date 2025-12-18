import { IsNotEmpty, IsString, IsOptional, IsUUID, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Username cannot be empty" })
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(4, { message: "Password must be at least 4 characters" })
    password: string;

    @IsOptional()
    @IsUUID()
    defaultCurrencyId?: string;
}
