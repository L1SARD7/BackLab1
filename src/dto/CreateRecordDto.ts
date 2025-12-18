import { IsNotEmpty, IsNumber, IsUUID, IsPositive, IsOptional } from "class-validator";

export class CreateRecordDto {
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @IsNotEmpty()
    @IsUUID()
    category_id: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive({ message: "Amount must be a positive number" })
    amount: number;

    @IsOptional()
    @IsUUID()
    currency_id?: string;
}
