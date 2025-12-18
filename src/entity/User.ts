import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Currency } from "./Currency";
import { Record } from "./Record";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Currency, currency => currency.users, { nullable: true })
    defaultCurrency: Currency;

    @OneToMany(() => Record, record => record.user)
    records: Record[];
}
