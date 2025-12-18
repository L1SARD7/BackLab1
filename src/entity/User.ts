import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Currency } from "./Currency";
import { Record } from "./Record";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true }) // Логін має бути унікальним
    name: string;

    @Column({ select: false }) // select: false означає, що пароль не буде повертатися при звичайних запитах (безпека)
    password: string;

    @ManyToOne(() => Currency, currency => currency.users, { nullable: true })
    defaultCurrency: Currency;

    @OneToMany(() => Record, record => record.user)
    records: Record[];
}
