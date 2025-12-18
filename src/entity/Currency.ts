import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { Record } from "./Record";

@Entity()
export class Currency {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    code: string; // USD, UAH

    @Column()
    name: string;

    @OneToMany(() => User, user => user.defaultCurrency)
    users: User[];

    @OneToMany(() => Record, record => record.currency)
    records: Record[];
}
